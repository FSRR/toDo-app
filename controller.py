from model import *

class UserController:
    def __init__(self):
        self.__file = UserDao()

    def getData(self, user):
        user = self.__file.getUser(user)
        return user

    def send(self, user):
        tasks = self.__file.updateData(user)
        return tasks

    def registerUser(self, user):
        user = self.__file.register(user)
        return user