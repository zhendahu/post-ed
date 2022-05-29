from django.db import models



# Create your models here.

from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    image_url = models.CharField(max_length=100)
