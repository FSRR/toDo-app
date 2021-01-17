class User:
    def __init__(self):
        self.__id = None
        self.__name= None
        self.__email = None
        self.__password = None
        self.__tasks = None

    @property
    def id(self):
        return self.__id

    @property
    def name(self):
        return self.__name

    @property
    def email(self):
        return self.__email

    @property
    def password(self):
        return self.__password

    @property
    def task(self):
        return self.__tasks

    @id.setter
    def id(self, id):
        self.__id = id

    @name.setter
    def name(self, name):
        self.__name = name

    @email.setter
    def email(self, email):
        self.__email = email

    @password.setter
    def password(self, password):
        self.__password = password

    @task.setter
    def task(self, task):
        self.__tasks = task
