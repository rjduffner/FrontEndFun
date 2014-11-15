var wtd = {};

var loadEvents = function() {
    $('.option-list a').on( "click", function() {
        console.log(this);
        displayOption = this.attributes.class.value
        if(displayOption == 'show-table'){
            loadFantasyTable(wtd.fantasyData.current_week);
        } else if(displayOption == 'show-chart'){
            loadFantasyChart('G');
        }
    });
}

var compileWeek = function(selected_view){
    var currentWeekData = {};
    currentWeekData.currentWeek = parseInt(wtd.fantasyData.current_week);
    
    currentWeekData.allWeeks = new Array();
    for(var count = 1; count <= currentWeekData.currentWeek; count++) {
        currentWeekData.allWeeks.push(count);
    }
    
    currentWeekData.selectedWeek = selected_view;

    columns = new Array();
    columns.push('#');
    columns.push('Team');
    currentWeekData.columns = columns.concat(wtd.fantasyData.stats);
    
    teams = wtd.fantasyData.teams_list;

    currentWeekData.leagueStats = new Array();
    for (team in teams) {
        data = new Array();
        data.push(parseInt(team) + 1);
        data.push(teams[team]);
        for (stat in wtd.fantasyData.stats) {
            data.push(wtd.fantasyData[currentWeekData.selectedWeek][teams[team]]['team_stats'][wtd.fantasyData.stats[stat]]["value"]);
        }
        currentWeekData.leagueStats.push(data);
    }
    return currentWeekData
}



var loadFantasyTable = function(selected_view) {
    currentWeekData = compileWeek(selected_view)
    var tpl = $('#stats-table-template').html()
    var html = Mustache.to_html(tpl, currentWeekData);
    $('.bd').html(html);
    $("#fantasy-table").tablesorter();
    
    var table = $("#fantasy-table");
    table.bind("sortEnd",function() {
        var i = 1;
        table.find("tr:gt(0)").each(function(){
            $(this).find("td:eq(0)").text(i);
            i++;
        });
    });
    $( ".view-list a" ).on( "click", function() {
        selectedWeek = this.attributes.week.value;
        loadFantasyTable(selectedWeek);
    });
    loadEvents();
}

var loadFantasyChart = function(selected_view) {
    current_week = parseInt(wtd.fantasyData.current_week);
    teams = wtd.fantasyData.teams_list;
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
            current_stat = wtd.fantasyData[i+1][teams[team]]['team_stats'][stat].value;
            if(current_stat == null) {
                current_stat = '0';
            }
            team_data.push(parseInt(current_stat));
        }
        current_team.data = team_data;
        team_stats.push(current_team);
    }

    var finalTrainData = {'departing' : wtd.fantasyData.stats}
    var tpl = $('#stats-chart-template').html()
    var html = Mustache.to_html(tpl, finalTrainData);
    $('.bd').html(html);
    $(function () { 
        $('#container-barchart').highcharts({
            chart: {
                type: 'line'
            },
            title: {
                text: 'Compare ' + stat + ' By Week'
            },
            xAxis: {
                categories: weeks,
            },
            yAxis: {
                title: {
                    text: stat
                }
            },
            series: team_stats 
        });
    });
    $( ".view-list a" ).on( "click", function(event) {
        event.preventDefault();
        loadFantasyChart(this.attributes.week.value);
    });
    loadEvents();
}

var getFantasyData = function() {
    $.get("/fantasy/chart/")
    .done(function(data) {
        wtd.fantasyData = data;
        loadFantasyTable(data.current_week);
    })
};

$(document).ready(function() {
    getFantasyData();
}); 
