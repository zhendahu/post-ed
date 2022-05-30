from http.client import HTTPResponse
from xmlrpc.client import ResponseError
from django.contrib.auth.models import User, Group
from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework import permissions
from user.serializers import UserSerializer, GroupSerializer
from user.permissions import IsOwnerOrReadOnly
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
import json

@api_view(['POST'])
def register(self, request, *args, **kwargs):
        return Response(status=200)
class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    #permission_classes = [IsOwnerOrReadOnly]
    # TODO: FINISH THIS
    def patch(self, request):
        try:
            data = json.loads(request.body)
            print(data)
            user_obj = User.objects.get(id=data['id'])
            user_obj.username = data['username']
            user_obj.email = data['email']
            user_obj.save()
        except:
            return Response(status=400)
        return JsonResponse({'status':200})

    


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]
