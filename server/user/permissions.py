from rest_framework import permissions

from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt.tokens import Token
from rest_framework_simplejwt.exceptions import TokenBackendError, TokenError
from rest_framework_simplejwt.utils import aware_utcnow, datetime_from_epoch, datetime_to_epoch, format_lazy
class AccessToken(Token):
    token_type = "access"
    lifetime = api_settings.ACCESS_TOKEN_LIFETIME
    def __init__(self, token=None, verify=True):
        """
        !!!! IMPORTANT !!!! MUST raise a TokenError with a user-facing error
        message if the given token is invalid, expired, or otherwise not safe
        to use.
        """
        if self.token_type is None or self.lifetime is None:
            raise TokenError(_("Cannot create token with no type or lifetime"))

        self.token = token
        self.current_time = aware_utcnow()

        # Set up token
        if token is not None:
            # An encoded token was provided
            token_backend = self.get_token_backend()

            # Decode token
            try:
                self.payload = token_backend.decode(token, verify=verify)
            except TokenBackendError:
                            # New token.  Skip all the verification steps.
                self.payload = {api_settings.TOKEN_TYPE_CLAIM: self.token_type}

                # Set "exp" and "iat" claims with default value
                self.set_exp(from_time=self.current_time, lifetime=self.lifetime)
                self.set_iat(at_time=self.current_time)
                self[api_settings.USER_ID_CLAIM]=-1

                # Set "jti" claim
                self.set_jti()
                return

            if verify:
                self.verify()
        else:
            # New token.  Skip all the verification steps.
            self.payload = {api_settings.TOKEN_TYPE_CLAIM: self.token_type}

            # Set "exp" and "iat" claims with default value
            self.set_exp(from_time=self.current_time, lifetime=self.lifetime)
            self.set_iat(at_time=self.current_time)

            # Set "jti" claim
            self.set_jti()


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_permission(self, request, view):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        # if request.method in permissions.SAFE_METHODS:
        #     return True

        # Write permissions are only allowed to the owner of the snippet.
        print("============")
        print(request.path,request.method)
        if request.path=="/api/users/" and (request.method=="POST" or request.method=="GET"):
            return True
        return bool(request.user and request.user.is_authenticated)