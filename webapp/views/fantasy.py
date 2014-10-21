"""

Author: Robert Duffner
Date: March 8, 2014
Email: rjduffner@gmail.com

home.py

"""
from pyramid.view import view_config
from pyramid.httpexceptions import HTTPFound

import webapp.lib.fantasy_api as fantasy_api


@view_config(route_name='fantasy', renderer='templates/fantasy/fantasy.jinja2')
def fantasy(request):
    return {'projects': ''}

@view_config(route_name='fantasy_table', renderer='templates/fantasy/fantasy_table.jinja2')
def fantasy_table(request):
    stats = fantasy_api.get_league_stats_by_team()
    sorting_columns =  stats[stats.keys()[0]]['team_stats'].keys()
    rows = []
    index = 1
    for player in stats.keys():
        
        row = []
        row.append(index)
        row.append(player)
        for stat in sorting_columns:
            row.append(stats[player]['team_stats'][stat]['value'])
        rows.append(row)
        index += 1 

    return {'headers': ['', 'Team'] + sorting_columns,
            'rows': rows}

