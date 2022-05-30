from django.db import models
from user.models import User

# Create your models here.
class Team(models.Model):
    team_name = models.CharField(max_length=25)
    team_password = models.CharField(max_length=25)
    team_users = models.ManyToManyField(User)
    created = models.DateTimeField(auto_now=True)
    updated = models.DateTimeField(auto_now=True)

class TaskGroup(models.Model):
    taskgroup_name = models.CharField(max_length=50)
    team = models.ForeignKey(Team, related_name="team_groups", on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now=True)
    updated = models.DateTimeField(auto_now=True)


class Task(models.Model):
    task_name = models.CharField(max_length=50)
    task_description = models.CharField(max_length=250)
    task_assignee = models.CharField(max_length=250)
    group = models.ForeignKey(TaskGroup, related_name="group_tasks", on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now=True)
    updated = models.DateTimeField(auto_now=True)

# class TaskGroup(models.Model):



# class TaskModal(models.Model):
