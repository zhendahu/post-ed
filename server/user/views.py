from django.contrib.auth.models import Group
from user.models import User
from rest_framework import viewsets
from rest_framework import permissions
from user.serializers import UserSerializer, GroupSerializer
from user.permissions import IsOwnerOrReadOnly
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['POST'])
def fileUpload(self, request, *args, **kwargs):
        print(request.FILES)
        return Response(status=200)
class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [IsOwnerOrReadOnly]

    


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]