from model import *

class UserController:
    def __init__(self):
        self.__file = UserDao()

    def get(self, user):
        user = self.__file.getUser(user)
        return user