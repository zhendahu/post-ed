from django.http import JsonResponse
from rest_framework import permissions, viewsets
from rest_framework.response import Response

from .models import *
from .seralizers import *

from rest_framework.decorators import api_view
from django.http import JsonResponse

@api_view(['GET'])
def searchForAGroup(request):
    queryset = TaskGroup.objects.all()
    return JsonResponse({"userId":request.user.id})

class TaskGroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows TaskGroups to be viewed or edited.
    """
    queryset = TaskGroup.objects.all()
    serializer_class = TaskGroupSerializer
    def patch(self, request):
        try:
            import json
            data = json.loads(request.body)
            print(data)
            should_delete = data['should_delete']
            if not should_delete:
                team_obj = Team.objects.get(id=data['id'])
                TaskGroup.objects.create(taskgroup_name=data['taskgroup_name'], team=team_obj)
            else:
                group_obj = TaskGroup.objects.get(id=data['group_id'])
                group_obj.delete()
        except Exception as e:
            print(e)
            return Response(status=400)
        return JsonResponse({'status':200})

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

