/*
using:
    circular positioning code:
        http://stackoverflow.com/a/10152437/1644202
    point at:
        http://pointat.idenations.com/api

depends on:
    jquery
    https://github.com/thomas-dotworx/jqrotate (pointat)
*/


function createFields() {
    $('.field').remove();
    var container = $('#container');
    for(var i = 0; i < +$('#number_input').text(); i++) {
        var projectID = '#' + i + ' p'
        $('<div/>', {
            'class': 'field',
            'text': $(projectID).text(),
            'project': i,
        }).appendTo(container);
    }
}

function distributeFields() {
    var radius = 200;
    var fields = $('.field'), container = $('#container'),
        width = container.width(), height = container.height(),
        angle = 0, step = (2*Math.PI) / fields.length;
    fields.each(function() {
        var x = Math.round(width/2 + radius * Math.cos(angle) - $(this).width()/2);
        var y = Math.round(height/2 + radius * Math.sin(angle) - $(this).height()/2);
        if(window.console) {
            console.log($(this).text(), x, y);
        }
        $(this).css({
            left: x + 'px',
            top: y + 'px'
        });
        angle += step;
    });
}

function initPointAt() {
    $('.field').pointat({
        target: "#center",
        defaultDirection: "down",
        xCorrection: -20,
        yCorrection: -20
    });
}

function initEvents() {
    $( '.field' ).hover(
    function() {
        var selectedField = this.getAttribute('project');
        $('#' + selectedField).removeClass('hide');

    }, function() {
        var selectedField = this.getAttribute('project');
        $('#' + selectedField).addClass('hide');
    }
    );
}
createFields();
distributeFields();
//initPointAt();
initEvents();
