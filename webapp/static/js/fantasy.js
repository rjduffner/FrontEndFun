
var loadFantasyTable = function() {
    var fantasyTable = $.get( "/fantasy/table/")
    .done(function(data) {
        $( ".bd" ).html(data) 
        $("#fantasy-table").tablesorter();
       
        var table = $("#fantasy-table");

        table.bind("sortEnd",function() {
            var i = 1;
            table.find("tr:gt(0)").each(function(){
                $(this).find("td:eq(0)").text(i);
                i++;
            });
        }); 
    })
}

$(document).ready(function() {
    loadFantasyTable();
}); 

