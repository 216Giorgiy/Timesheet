// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;

using Microsoft.Extensions.Logging;

using System.Globalization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.Localization;
using GoLocal.TimeTracker.Dashboard.Resources;
using System.Reflection;
using Microsoft.Extensions.Options;
using GoLocal.TimeTracker.Dashboard.Abstractions;
using GoLocal.TimeTracker.Dashboard.Services;
using GoLocal.TimeTracker.Dashboard.Interfaces;
using GoLocal.TimeTracker.Dashboard.ViewModels;
using GoLocal.TimeTracker.MiddleTier.Extensions;
using GoLocal.TimeTracker.MiddleTier.Utilities;
using GoLocal.TimeTracker.MiddleTier.Services;
using GoLocal.TimeTracker.MiddleTier.Abstractions;
using GoLocal.TimeTracker.MiddleTier.Models;
using GoLocal.TimeTracker.MiddleTier.Repositories;
using GoLocal.TimeTracker.MiddleTier.Helpers;
using Microsoft.AspNetCore.Http.Features;
using GoLocal.TimeTracker.MiddleTier.Services.AppContext;

namespace GoLocal.TimeTracker.Dashboard
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Register Azure AD authentication service options
            services.AddAuthentication(sharedOptions =>
            {
                sharedOptions.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                sharedOptions.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                sharedOptions.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
            })
            .AddAzureAd(options => Configuration.Bind("AzureAd", options))
            .AddCookie();

            // Localization services
            services.AddSingleton<LocService>();
            services.AddLocalization(options => options.ResourcesPath = "Resources");


            services.AddMvc()                
                .AddViewLocalization(LanguageViewLocationExpanderFormat.Suffix)                                
                .AddDataAnnotationsLocalization();

            services.Configure<RequestLocalizationOptions>(
                options =>
                {
                    var supportedCultures = new List<CultureInfo>
                        {
                            new CultureInfo("en-US"),
                            new CultureInfo("ja-JP"),
                            new CultureInfo("ja")
                    };
                    options.DefaultRequestCulture = new RequestCulture(culture: "en-US", uiCulture: "en-US");
                    // You must explicitly state which cultures your application supports.
                    // These are the cultures the app supports for formatting numbers, dates, etc.
                    options.SupportedCultures = supportedCultures;
                    // These are the cultures the app supports for UI strings, i.e. we have localized resources for.
                    options.SupportedUICultures = supportedCultures;
                });

            // Add scheduled tasks,  scheduler & related services
            // TODO: Varma:  review changing from singleton to scoped.
            services.AddSingleton<GraphAppUserService>();
            services.AddSingleton<GraphAppSharePointService>();

            // Add application services
            services.AddSingleton<IGraphAuthProvider, GraphAuthProvider>(); // Auth provider for Graph client
            services.AddTransient<IUserContext, AspNetUserContext>(); // ClaimsPrincipal adapter
            services.AddSingleton<TimezoneHelper>();

            // Add workflow services
            services.AddScoped<IWorkflowService<TeamHours>, TeamHoursWorkflowService>();
            services.AddScoped<IWorkflowService<WorkHours>, WorkHoursWorkflowService>();
            services.AddScoped<WorkflowServiceHelper>();

            // Register data & view model services
            services.AddScoped<IViewModelService<TeamHoursViewModel>, TeamHoursService>();
            services.AddScoped<IDataService, TimeTrackerDataService>();
            services.AddScoped<IMonthlyReportHoursService<MyMonthlyHoursViewModel>, MonthlyReportHoursService>();
            services.AddScoped<IWeeklyReportHoursService<WeeklyHoursViewModel>, WeeklyReportHoursService>();
            services.AddScoped<Interfaces.IAnalyticsServiceDashBoard<AnalyticsViewModel>, AnalyticsService>();

            // Register configuration options
            services.Configure<TimeTrackerOptions>(Configuration.GetSection("TimeTracker"));

            // Register cache services
            services.AddScoped<ICacheService<ListCollectionPage<WorkHours>>, WorkHoursMemoryCache>();
            services.AddScoped<ICacheService<ListCollectionPage<Notifications>>, NotificationsMemoryCache>();
            services.AddScoped<ICacheService<UserProfile>, UserProfileMemoryCache>();
            services.AddScoped<ICacheService<ListCollectionPage<TeamHours>>, TeamHoursMemoryCache>();
            services.AddScoped<ICacheService<ListCollectionPage<GraphResultItem>>, DirectReportsMemoryCache>();
            services.AddScoped<ICacheService<ListCollectionPage<ReportHours>>, ReportHoursMemoryCache>();

            // Register repositories
            services.AddScoped<IRepository<UserProfile>, UserProfileRepository>();
            services.AddScoped<IRepository<WorkHours>, WorkHoursRepository>();
            services.AddScoped<IRepository<TeamHours>, TeamHoursRepository>();
            services.AddScoped<IRepository<ReportHours>, ReportHoursRepository>();
            services.AddScoped<IRepository<Notifications>, NotificationsRepository>();
            services.AddScoped<IRepository<Analytics>, AnalyticsRepository>();
            // Register Graph Api services
            // TODO: Varma:  appuser adn appsharepointsvc are added as singleton above.  Fix it.
            services.AddScoped<GraphAppTasksService>();
            services.AddScoped<GraphAppCalendarService>();
            services.AddScoped<GraphAppMailService>();

            // This sample uses an in-memory cache for tokens and subscriptions. Production apps will typically use some method of persistent storage.
            services.AddMemoryCache();
            services.AddSession();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            var locOptions = app.ApplicationServices.GetService<IOptions<RequestLocalizationOptions>>();
            app.UseRequestLocalization(locOptions.Value);
            


            app.UseStaticFiles();

            app.UseSession();

            app.UseAuthentication();

            #region Logger configuration
            var logger = loggerFactory.CreateLogger("default");
            loggerFactory.AddDebug();
            logger.LogInformation("Time Tracker Middleware - Started.");
            #endregion

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}

