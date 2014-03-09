"""

Author: Robert Duffner
Date: March 8, 2014
Email: rjduffner@gmail.com

views.py

"""
from pyramid.view import view_config
from pyramid.httpexceptions import HTTPFound


@view_config(route_name='home', renderer='templates/home.jinja2')
def home(request):
    return {'project':'webapp'}
