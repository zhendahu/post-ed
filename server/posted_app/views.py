from django.http import JsonResponse
from rest_framework import permissions, viewsets
from rest_framework.response import Response

from .models import *
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

class TeamViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Teams to be viewed or edited.
    """
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    def patch(self, request):
        try:
            import json
            data = json.loads(request.body)
            print(data)
            user_obj = User.objects.get(id=data['id'])
            print(user_obj)
            if not data['should_leave']:
                team_obj = Team.objects.get(team_name=data['name'], team_password=data['password'])
                print(team_obj)
                team_obj.team_users.add(user_obj)
                team_obj.save()
                user_obj.save()
            else:
                team_obj = Team.objects.get(team_name=data['name'])
                print(team_obj)
                team_obj.team_users.remove(user_obj)
                team_obj.save()
                user_obj.save()
        except:
            return Response(status=400)
        return JsonResponse({'status':200})

