from flask import Flask
from flask import render_template
from flask import redirect
from flask import url_for
from flask import request
from flask import session
from flask import jsonify
from entity import *
from controller import *


app = Flask(__name__)
app.secret_key = "gettherefast"

@app.route('/')
def index():
    if 'data' in session:
        data = session['data']
        print(data)
        return render_template('toDo.html', data = data)

    alert = request.args.get('alert')
    return render_template('index.html', alert = alert)


@app.route('/validate', methods = ['POST'])
def validate(): 
    user = User()
    user.name = request.form['userName']
    user.password = request.form['userPass']

    controller = UserController()
    data = controller.getData(user)
    if data:
        session['data'] = data

    alert = 'Usuario no registrado'
    return redirect(url_for('index', alert = alert))
        


@app.route('/register', methods = ['POST', 'GET'])
def register(): 
    if request.method == 'GET':
        return render_template('register.html')
    if request.method == 'POST':
        user = User()
        user.name = request.form['userName']
        user.email = request.form['userEmail']
        user.password = request.form['userPass']

        controller = UserController()
        data = controller.registerUser(user)
        session['data'] = data
        print(data)
        return redirect(url_for('index'))


@app.route('/sendData', methods = ['POST'])
def sendData():
    data = request.get_json()
    user = User()
    user.id = data['id']
    user.tasks = data['tasks']

    controller = UserController()
    response = controller.send(user)

    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)
