"""posted URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include,path
from rest_framework import routers
from user import views as user_views
from posted_app import views as posted_views

#json web token configure
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from rest_framework_simplejwt.authentication import JWTAuthentication

from posted_app import views as posted_views
from rest_framework.urlpatterns import format_suffix_patterns

router = routers.DefaultRouter()
router.register(r'users', user_views.UserViewSet)
router.register(r'groups', user_views.GroupViewSet)
router.register(r'taskgroups', posted_views.TaskGroupViewSet)
router.register(r'tasks', posted_views.TaskViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls),
    path('api-auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api-auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/', include('user.urls')),
]
