import logging


def includeme(config):
    config.add_route('home_image_wall', '/v1/')
    config.add_route('home_circle_wall', '/v2/')

    config.add_route('fantasy', '/fantasy/')
    config.add_route('fantasy_noslash', '/fantasy')

    config.add_route('fantasy_table', '/fantasy/table/')
    config.add_route('fantasy_table_ajax', '/fantasy/table/ajax/')
    config.add_route('fantasy_chart', '/fantasy/chart/')
    config.scan('.')
