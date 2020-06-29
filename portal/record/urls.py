from django.conf.urls import include, url
from . import views

app_name = 'record'

urlpatterns = [
    # 主页
    url(r'^$', views.index, name = 'index'),
]
