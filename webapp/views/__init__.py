import logging

def includeme(config):
    config.add_route('home_image_wall', '/')
    config.add_route('home_circle_wall', '/v2')
    
    config.scan('.')
