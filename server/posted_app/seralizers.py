from .models import *
from rest_framework import serializers


class TaskGroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TaskGroup
        fields = ['id', 'taskgroup_name', 'group_tasks']

class TaskSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'task_name', 'task_description', 'group']

