from .models import *
from rest_framework import serializers


class TaskGroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TaskGroup
        fields = ['id', 'taskgroup_name', 'team', 'group_tasks']

class TaskSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'task_name', 'task_description', 'group']

class TeamSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Team
        fields = ['team_name', 'team_password', 'team_groups', 'team_users']


