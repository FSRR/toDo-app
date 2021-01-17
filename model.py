from entity import *
import pickle
import json

class UserDao:
    def __init__(self):
        pass

    def getUser(self, user):
        try:
            with open('files/users.json', 'r') as data:
                if data.read():
                    users = json.loads(data.read())
                    
                    for u in users:
                        if user.name == u['user'] and user.password == u['password']:
                            print('Datos obtenidos')
                            return u
                else:
                    return None

        except Exception as e:
            print(e)

    def updateData(self, user):
        try:
            users = None
            with open('files/users.json', 'r') as data:
                users = json.loads(data.read())

            with open('files/users.json', 'w') as data:
                for u in users:
                    if u['id'] == int(user.id):
                        u['tasks'] = user.tasks
                        break

                data.write(json.dumps(users, indent=4))
                print('Datos guardados')
                return user.tasks

        except Exception as e:
            print(e)
            return 'No se pudieron guardar los datos'

    def register(self, user):
        try:
            users = []
            with open('files/users.json', 'r+') as data:
                user.id = 0
                user.tasks = []
                if data.read():
                    users = json.loads(data.read())

                    ids = []
                    for u in users:
                        ids.append(u['id'])
                    user.id = max(ids) + 1

                newUser = {
                    "id": user.id,
                    "user": user.name,
                    "email": user.email,
                    "password": user.password,
                    "tasks": user.tasks
                }

            with open('files/users.json', 'w') as data:
                users.append(newUser)
                data.write(json.dumps(users, indent=4))

                print('Usuario registrado')
                return newUser

        except Exception as e:
            print(e)
            return 'No se pudo registrar el usuario'
