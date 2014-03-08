from pyramid.i18n import TranslationStringFactory

_ = TranslationStringFactory('webapp')

def my_view(request):
    return {'project':'webapp'}
