from entity import *
from connection import *
import pickle
import json

class UserDao:
    def __init__(self):
        pass

    def getUser(self, user):
        connection = Connection()
        users = connection.myConnection()
        if users:
            for u in users:
                    if user.name == u['user'] and user.password == u['password']:
                        print('Datos obtenidos')
                        return u
        
        return None

    def updateData(self, user):
        connection = Connection()
        users = connection.myConnection()
        if users:
            try:
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
                print('No se pudieron guardar los datos')
                return None
        
        return users

    def register(self, user):
        connection = Connection()
        users = connection.myConnection()
        print(users)
        user.id = 0
        user.tasks = []
        ids = []
        if users:
            for u in users:
                if user.name == u['user'] and user.password == u['password']:
                    return None
                ids.append(u['id'])
            user.id = max(ids) + 1
        else:
            users = []

        newUser = {
            "id": user.id,
            "user": user.name,
            "email": user.email,
            "password": user.password,
            "tasks": user.tasks
        }

        try:
            with open('files/users.json', 'w') as data:
                users.append(newUser)
                data.write(json.dumps(users, indent=4))

                print('Usuario registrado')
                return newUser

        except Exception as e:
            print(e)
            print('No se pudo registrar el usuario')
            return None
            
