var color = Chart.helpers.color;
weekLbl = (typeof (weekLbl) == 'undefined' || weekLbl == null) ? [] : weekLbl;
arrWorkHrs = (typeof (arrWorkHrs) == 'undefined' || arrWorkHrs == null) ? [] : arrWorkHrs;
arrWorkHrsIsSubmited = (typeof (arrWorkHrsIsSubmited) == 'undefined' || arrWorkHrsIsSubmited == null) ? [] : arrWorkHrsIsSubmited;
arrWorkHrsIsCurrent = (typeof (arrWorkHrsIsCurrent) == 'undefined' || arrWorkHrsIsCurrent == null) ? [] : arrWorkHrsIsCurrent;
var barChartData = {
    labels: weekLbl,
        datasets: [{
            type: 'bar',
            label: 'Calculated Hours ',
            backgroundColor: fnChartBarColorArr(arrWorkHrsAdjusted), //color(window.chartColors.green).rgbString(),
            borderColor: fnChartBarColorArr(arrWorkHrsAdjusted), // window.chartColors.green,
            data: arrWorkHrs
		},
			
	
		{
			type: 'bar',
			label: 'Adjusted Hours ',
            backgroundColor: fnChartBarColorArrAdjWorkHrs(arrWorkHrsAdjusted), //color(window.chartColors.green).rgbString(),
            borderColor: fnChartBarColorArrAdjWorkHrs(), // window.chartColors.green,
			data: arrWorkHrsAdjusted
		}
			
		]
};


function fnChartBarColorArr(arrWorkHrs) {
    var colorArr = [];
    for (var i = 0; i < arrWorkHrsIsSubmited.length; i++) {
        var isSub = arrWorkHrsIsSubmited[i];
        var iscurrent = arrWorkHrsIsCurrent[i];
        if (SubmittedDate == "1/1/0001 12:00:00 AM") { isSub = false; }
        if (isSub) {
            if (arrWorkHrs[i] != 0) {
                $('.lgd ul li:nth-child(3)').css("display", "block")
                colorArr.push(color(window.chartColors.blue).rgbString());
            } else {
                $('.lgd ul li:nth-child(3)').css("display", "none");
                colorArr.push(color(window.chartColors.grey).rgbString());
            }
             //  submitted previous month hours
        } else {
            if (iscurrent) {
                colorArr.push(color(window.chartColors.blue).rgbString()); 
            }
            else {
                //colorArr.push('#98AFC7'); // not submitted previous month hours
                colorArr.push(color(window.chartColors.blue).rgbString()); // not submitted previous month hours same as current hours
            }
            
        }
    }
    return colorArr;
}

function fnChartBarColorArrAdjWorkHrs() {
    var colorArrAdjWorkHrs = [];
    for (var i = 0; i < arrWorkHrsIsSubmited.length; i++) {
        var isSub = arrWorkHrsIsSubmited[i];
        var iscurrent = arrWorkHrsIsCurrent[i];
        if (isSub) {
            colorArrAdjWorkHrs.push(color(window.chartColors.grey).rgbString()); //  submitted previous month hours
        } else {
            colorArrAdjWorkHrs.push(color(window.chartColors.green).rgbString());

        }
    }
    return colorArrAdjWorkHrs;
}
        // Define a plugin to provide data labels
        Chart.plugins.register({
            afterDatasetsDraw: function(chart, easing) {
                // To only draw at the end of animation, check for easing === 1
                var ctx = chart.ctx;
                chart.data.datasets.forEach(function (dataset, i) {
                    var meta = chart.getDatasetMeta(i);
                    if (!meta.hidden) {
                        meta.data.forEach(function(element, index) {
                            // Draw the text in black, with the specified font
                            ctx.fillStyle = 'rgb(0, 0, 0)';
                            var fontSize = 14;
                            var fontStyle = 'normal';
                            var fontFamily = 'Arial';
                            //ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
                            // Just naively convert to string for now
                            //var dataString = dataset.data[index].toString();
							
                            var minutes = Math.round((dataset.data[index] - Math.floor(dataset.data[index])) * 60);
                            var dataString = (Math.floor(dataset.data[index])).toString() + "h " + (minutes).toString() + "m";
                            if (dataset.data[index] == 0)                                                                                                                                                       
                                dataString = "";
                            // Make sure alignment settings are correct
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            var padding = 5;
                            var position = element.tooltipPosition();
                            ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
                        });
                    }
                });
            }
});

      window.onload = function () {
            var ctx = document.getElementById("canvas").getContext("2d");
            window.myBar = new Chart(ctx, {
                type: 'bar',
                data: barChartData,
                options: {
                    responsive: true,
                    legend: false,
                    layout: {
                        padding: {
                            left: 0,
                            right: 0,
                            top: 20,
                            bottom: 0,
                            fontSize: 14
                        }
                    },
                    scales: {
                        xAxes: [{
                            ticks: {
                                beginAtZero: false,
                                fontSize: 12,
                                fontFamily: "Arial",
                                fontColor: '#000',
                            },
                            gridLines: { display: false, }
                        }],
                        yAxes: [{
                            ticks: {
                                display: false,
                                beginAtZero: true,
                                fontSize: 12,
                                fontFamily: "Arial",
                                fontColor: '#000',
                                //min: 1,
                                //max: 20
                            },
                            gridLines: { display: false, drawBorder: false }
                        }]
                    },
                    tooltips: {
                        callbacks: {
                            label: function (t, d) {
                                var xLabel = d.datasets[t.datasetIndex].label;
                                var minutes = Math.round((d.datasets[t.datasetIndex].data[t.index] - Math.floor(d.datasets[t.datasetIndex].data[t.index])) * 60);
                                var dataString = (Math.floor(d.datasets[t.datasetIndex].data[t.index])).toString() + "h " + (minutes).toString() + "m";
                                return xLabel + ': ' + dataString;
                            }
                        }
                    }
                }
            });
            
        };

        /*
        document.getElementById('randomizeData').addEventListener('click', function() {
            barChartData.datasets.forEach(function(dataset) {
                dataset.data = dataset.data.map(function() {
                    return randomScalingFactor();
                })
            });
            window.myBar.update();
        });
  */