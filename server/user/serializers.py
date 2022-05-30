from django.contrib.auth.models import Group
from user.models import User
from rest_framework import serializers

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['name','url']

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'url', 'username','email','password','is_staff','image_url', 'team_set']
        read_only_fields = ('is_staff',)
        write_only_fields = ('password',)
        extra_kwargs={
            'password': {'write_only': True},
            'image_url':{'required':False}
        }
    def create(self, validated_data):
        user = User.objects.create_user(**{k:v for k,v in validated_data.items() if k!='groups' and k!='team_set'})
        #user.groups.set(validated_data["groups"])
        return user


