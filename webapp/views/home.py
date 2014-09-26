"""

Author: Robert Duffner
Date: March 8, 2014
Email: rjduffner@gmail.com

home.py

"""
from pyramid.view import view_config
from pyramid.httpexceptions import HTTPFound


def get_projects():
    projects = [
        ('Hollister Hills', "static/image/2.jpg"),
        ('Carnige', "static/image/3.jpg"),
        ('Dumont', "static/image/4.jpg"),
        ('Johnson Valley', "static/image/5.jpg"),
        ('Chappie Shasta', "static/image/6.jpg"),
        ('Metcalf', "static/image/7.jpg"),
        ('Tahoe', "static/image/8.jpg"),
        ('Stonyford', "static/image/1.jpg"),
        ]
    return projects


@view_config(route_name='home_image_wall', renderer='templates/home_image_wall.jinja2')
def home(request):
    projects = get_projects()
    return {'projects': projects}

@view_config(route_name='home_circle_wall', renderer='templates/home_circle_wall.jinja2')
def home_v2(request):
    projects = get_projects()
    return {'projects': projects}
