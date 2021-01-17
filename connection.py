import json

class Connection:
    def __init__(self):
        pass

    def myConnection(self):
        try:
            with open('files/users.json', 'r') as data:
                users = json.loads(data.read())
                return users
        except Exception as e:
            print(e)
            return None
