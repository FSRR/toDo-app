from entity import *
import pickle
import json

class UserDao:
    def __init__(self):
        pass

    def getUser(self, user):
        try:
            with open('files/users.json', 'r') as data:
                users = json.loads(data.read())
                
                for u in users:
                    print(u)
                    if user.name == u['user'] and user.password == u['password']:
                        return u

        except Exception as e:
            print(e)


# user = UserDao()
# data = user.getUser('Martha', '123')

# json.dump(jsona, user)
# data = user['user']
# print(data)