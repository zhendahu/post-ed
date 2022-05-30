from django.urls import path
from user import views
from datetime import timedelta

urlpatterns = [
    path('avatar_upload', views.fileUpload, name='avatarUpload'),
    path('currentUser', views.currentUser, name='currentUser'),

]