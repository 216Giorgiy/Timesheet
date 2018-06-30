window.onload = function () {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var d = new Date();
    d = monthNames[d.getMonth() - 1] + "," + d.getFullYear()
    $('#txtMonthlyDate').val(d)
    GetResult(d);
}


