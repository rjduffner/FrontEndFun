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


var chartData;






var getFantasyChart = function() {
    var fantasyTable = $.get("/fantasy/chart/")
    .done(function(data) {
        chartData = data;
        loadFantasyChart('G');
    })
};
        

var loadFantasyChart = function(selected_view) {
    data = chartData
    current_week = parseInt(data.stats_by_week.current_week);
    teams = data.stats_by_week.teams_list;
    stat = selected_view;

    var weeks = new Array();
    for(var count = 1; count <= current_week; count++) {
        weeks.push(count);
    }
    var team_stats = new Array();
    for(team in teams){
        var current_team = {};
        current_team.name = teams[team];
        team_data = new Array();
        for(i = 0; i < weeks.length; i++){
            current_stat = data.stats_by_week[i+1][teams[team]]['team_stats'][stat].value;
            if(current_stat == null) {
                current_stat = '0';
            }
            team_data.push(parseInt(current_stat));
        }
        current_team.data = team_data;
        team_stats.push(current_team);
    }

    var finalTrainData = {'departing' : data.stats_by_week.stats}
    var tpl = $('#stats-chart').html()
    var html = Mustache.to_html(tpl, finalTrainData);
    $('#train-data').html(html);
    $(function () { 
        $('#container-barchart').highcharts({
            chart: {
                type: 'line'
            },
            title: {
                text: 'Compare ' + stat + ' By Week'
            },
            xAxis: {
                categories: weeks
            },
            yAxis: {
                title: {
                    text: stat
                }
            },
            series: team_stats 
        });
    });
    $( "#stats-list a" ).on( "click", function() {
        loadFantasyChart(this.attributes.week.value);
    });
}


$(document).ready(function() {
    loadFantasyTable("0");
    getFantasyChart()
}); 
