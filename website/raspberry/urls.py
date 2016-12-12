from django.conf.urls import url

from . import views

app_name = 'raspberry'
urlpatterns = [
    url(r'^music$', views.music, name="play_music"),
    url(r'^search$', views.search_music, name="search_music"),
    url(r'^music_list$', views.get_music_list, name="get_music_list"),
    url(r'^main.html$', views.get_main, name="get_main_page")
]
