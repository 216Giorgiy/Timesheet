// Write your JavaScript code.
$(function () {
    // $('.timepicker5').timepicki({ show_meridian: false });
    // set max date for calander control
    //$('.txtWeeklyDate,.txtMonthlyDate,.txtEditHrsDate,.txtTeamMonthlyDate').pickadate('picker').set('max', new Date()); 

    //var table = $('#tblMyTeam').DataTable({
    //    "paging": false,
    //    "ordering": false,
    //    "info": false,
    //    "searching": false,
    //    //"columnDefs": [{
    //    //    "targets": -1,
    //    //    "data": null,
    //    //    "defaultContent": "<span class='editHrs'><i class='ms-Icon ms-Icon--SingleColumnEdit font20 Pointer' aria-hidden='true'></i></span> &nbsp;&nbsp;&nbsp; <span class='recheckHrs'> <i class='ms-Icon ms-Icon--DelveAnalytics font20 Pointer'></i></span>"
    //    //}]
    //});
    // Row click event
    //$('#tblMyTeam tbody').on('click', 'tr', function () {
    //    // console.log(table.row(this).data());
    //    $("#dispEmpNameImg").html(table.row(this).data()[0]);
    //    $("#txtAdjHrs").val(table.row(this).data()[3]);
    //    $('#EditTime').modal('show'); 
    //});
    

    $(".btnSearch").click(function () {
        var request = $("#frmSearch").serializeArray();
        var searchObj = {
            "date": $(".selDate").val(),
            "name": $(".empName").val()
        };
        $.ajax({
            url: "/Home/MyTeamSearch/",
            type: 'post',
            data: request,
            success: function (data) {
                debugger;
                if (data.responseCode > 0) {


                }

            },
            error: function (jqXHR, textStatus, errorThrown) {

                // alert(errorThrown);
            }
        })
    });

    // Edit Adjusted hours - MyTeams
    $(".btnEditAdjHrs").click(function () {
        var adjTime = $("#txtAdjHrs").split(":");
        var adjustedhoursObj = {
            "adjHrs": adjTime[0],
            "adjMins": adjTime[1],
            "objIdentifier": $("#txtAdjHrs").attr('objIdentifier')
        };
        // ToDO - Implmentation 
        $.ajax({
            url: "/Home/MyTeamSaveAdjustedTime/",
            type: 'post',
            data: adjustedhoursObj,
            success: function (data) {
                debugger;
                if (data.responseCode > 0) {


                }

            },
            error: function (jqXHR, textStatus, errorThrown) {

                // alert(errorThrown);
            }
        })
    });

    // UnRead Notification count display
    /*
    if (notifications.length == 0) {
        $(".notificationUnReadCount").hide();
    } else {
        var newMsgCnt = $.grep(notifications, function (n, i) {
            return notifications[i].IsRead == false;
        });
        if (newMsgCnt.length > 0) {
            $(".notificationUnReadCount").text(newMsgCnt.length).show();
        } else {
            $(".notificationUnReadCount").hide();
        }

    }
    */

});

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}