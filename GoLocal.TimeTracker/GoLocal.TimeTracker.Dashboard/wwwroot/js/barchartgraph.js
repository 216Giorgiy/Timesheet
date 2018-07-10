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
//BarChart begin


//Chart End

      

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