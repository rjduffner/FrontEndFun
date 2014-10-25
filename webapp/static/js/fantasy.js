var loadFantasyTable = function(selected_view) {
    var fantasyTable = $.get("/fantasy/table/", 
                             {"selected_view": selected_view})
    .done(function(data) {
        $( ".bd" ).html(data)
        $( "a[week='" + $( "#current-view" ).text() + "']" ).addClass('current-view');
        $("#fantasy-table").tablesorter();
        var table = $("#fantasy-table");

        table.bind("sortEnd",function() {
            var i = 1;
            table.find("tr:gt(0)").each(function(){
                $(this).find("td:eq(0)").text(i);
                i++;
            });
        });
        $( "a" ).on( "click", function() {
            loadFantasyTable(this.attributes.week.value);
        });
    })
}

$(document).ready(function() {
    loadFantasyTable("0");
}); 
