from django.contrib.auth.models import Group
from user.models import User
from rest_framework import viewsets
from rest_framework import permissions
from user.serializers import UserSerializer, GroupSerializer
from user.permissions import IsOwnerOrReadOnly
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

@api_view(['POST'])
def fileUpload(request, *args, **kwargs):
    filename,extension= os.path.splitext(request.FILES["image"].name)
    filePath= os.path.join(BASE_DIR,"static","avatars") 
    with open(os.path.join(filePath,request.data["username"]+extension), 'wb+') as destination:
        for chunk in request.FILES["image"].chunks():
            destination.write(chunk)
    return JsonResponse({'image_url': "avatars/"+request.data["username"]+extension})
@api_view(['GET'])
def currentUser(request):

    return JsonResponse({"userId":request.user.id})

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [IsOwnerOrReadOnly]
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
    #permission_classes = [permissions.IsAuthenticated]
