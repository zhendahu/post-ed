from django.urls import path
from user import views

urlpatterns = [
    path('avatar_upload', views.fileUpload, name='avatarUpload'),
]