

//var ctx = document.getElementById("myAreaChart");

//var ctx = document.getElementById("myBarChart");
var myLineChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Mon 4/12", "Tue 5/12", "Wed 6/12", "Thu 7/12", "Fri  8/12", "Sat  9/12"],

        datasets: [{
            label: "Working Hours",
            backgroundColor: "rgba(2,117,216,1)",
            borderColor: "rgba(2,117,216,1)",
            data: [4215, 5312, 6251, 7841, 9821, 14984],
        }],
    },
    options: {
        scales: {
            xAxes: [{
                time: {
                    unit: 'Dates'
                },
                gridLines: {
                    display: false
                },
                ticks: {
                    maxTicksLimit: 6
                }
            }],
            yAxes: [{
                ticks: {
                    min: 0,
                    max: 15000,
                    maxTicksLimit: 5
                },
                gridLines: {
                    display: true
                }
            }],
        },
        legend: {
            display: false
        }
    }
});


