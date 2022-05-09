from .models import *
from rest_framework import viewsets
from rest_framework import permissions
from .seralizers import *

class TaskGroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows TaskGroups to be viewed or edited.
    """
    queryset = TaskGroup.objects.all()
    serializer_class = TaskGroupSerializer

class TaskViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Tasks to be viewed or edited.
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

