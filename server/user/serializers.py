from django.contrib.auth.models import User, Group
from rest_framework import serializers

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['name','url']

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email','password','is_staff','groups']
        write_only_fields = ('password',)
    def create(self, validated_data):
        user = User.objects.create_user(**{k:v for k,v in validated_data.items() if k!='groups'})
        user.groups.set(validated_data["groups"])
        return user


