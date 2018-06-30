
function exportTableToCSV($table, filename) {
    var $headers = $table.find('tr:has(th)')
        , $rows = $table.find('tr:has(td)')
       
        , tmpColDelim = String.fromCharCode(11) 
        , tmpRowDelim = String.fromCharCode(0) 

        , colDelim = '","'
        , rowDelim = '"\r\n"';
    var csv = '"';
    csv += formatRows($headers.map(grabRow));
    csv += rowDelim;
    csv += formatRows($rows.map(grabRow)) + '"';

    var csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

    if (window.navigator.msSaveOrOpenBlob) {
        var blob = new Blob([decodeURIComponent(encodeURI(csv))], {
            type: "text/csv;charset=utf-8;"
        });
        navigator.msSaveBlob(blob, filename);
    } else {
        $(this)
            .attr({
                'download': filename
                , 'href': csvData
               
            });
    }

    function formatRows(rows) {
        return rows.get().join(tmpRowDelim)
            .split(tmpRowDelim).join(rowDelim)
            .split(tmpColDelim).join(colDelim);
    }
    function grabRow(i, row) {

        var $row = $(row);
        var $cols = $row.find('td');
        if (!$cols.length) $cols = $row.find('th');

        return $cols.map(grabCol)
                    .get().join(tmpColDelim);
    }
    function grabCol(j, col) {
        var $col = $(col),
            $text = $col.text();

        return $text.replace('"', '""');

    }
}

$("#export").click(function (event) {
    var outputFile = 'Data';
    outputFile = outputFile.replace('.csv', '') + '.csv'

    exportTableToCSV.apply(this, [$('#dvData > table'), outputFile]);
});



