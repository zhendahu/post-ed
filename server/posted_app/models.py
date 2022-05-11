from django.db import models

# Create your models here.

class UserManager(models.Manager):
    def basic_validator(self, post_data):
        errors = {}
        try:
            if len(post_data["username_input"]) > 25:
                errors["username_input"] = "Username should be 25 characters long or less."
            elif len(post_data["username_input"]) < 2:
                errors["username_input"] = "Username should be at least 2 characters long."
            if len(post_data["password_input"]) < 8:
                errors["password_input"] = "Password should be longer than 8 characters long."
        except:
            errors["unknown_error"] = "An unknown error has occured."
        return errors

class User(models.Model):
    objects = UserManager()
    username = models.CharField(max_length=25)
    password = models.TextField()
    created = models.DateTimeField(auto_now=True)
    updated = models.DateTimeField(auto_now=True)

class Team(models.Model):
    team_name = models.CharField(max_length=25)
    team_users = models.ManyToManyField(User, related_name="joined_teams")
    created = models.DateTimeField(auto_now=True)
    updated = models.DateTimeField(auto_now=True)


class Task(models.Model):
    task_name = models.CharField(max_length=50)
    task_description = models.CharField(max_length=250)
    author = models.ForeignKey(User, related_name="post_author", on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now=True)
    updated = models.DateTimeField(auto_now=True)

# class TaskGroup(models.Model):



# class TaskModal(models.Model):
