class User:
    def __init__(self):
        self.__name= None
        self.__email = None
        self.__password = None
        self.__toDo = None

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
    def toDo(self):
        return self.__toDo

    @name.setter
    def name(self, name):
        self.__name = name

    @email.setter
    def email(self, email):
        self.__email = email

    @password.setter
    def password(self, password):
        self.__password = password

    @toDo.setter
    def toDo(self, toDo):
        self.__toDo = toDo
