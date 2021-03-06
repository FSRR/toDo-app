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
    theme = True
    if 'theme' in session:
        theme = session['theme']
    if 'data' in session:
        data = session['data']
        return render_template('index.html', data = data, theme=theme)
    
    alert = request.args.get('user')
    return render_template('index.html', alert = alert, theme=theme)


@app.route('/login')
def login():
    theme = 'True'
    if 'theme' in session:
        theme = session['theme']
    alert = request.args.get('alert')
    return render_template('login.html', alert = alert, theme = theme)


@app.route('/signin')
def signin():
    theme = 'True'
    if 'theme' in session:
        theme = session['theme']
    alert = request.args.get('alert')
    return render_template('register.html', alert = alert, theme = theme)


@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))


@app.route('/validate', methods = ['POST'])
def validate(): 
    user = User()
    user.name = request.form['userName']
    user.password = request.form['userPass']

    controller = UserController()
    data = controller.getData(user)
    if data:
        session['data'] = data
        return redirect(url_for('index'))
    else:
        alert = 'Usuario no encontrado'
        return redirect(url_for('login', alert = alert))
        

@app.route('/register', methods = ['POST', 'GET'])
def register(): 
    if request.method == 'GET':
        return render_template('register.html')
    if request.method == 'POST':
        user = User()
        user.name = request.form['userName']
        user.email = request.form['userEmail']
        user.password = request.form['userPass']

        if not (user.name and user.email and user.password):
            print('si')
            alert = 'Rellena todos los campos'
            return redirect(url_for('signin', alert = alert))
        
        controller = UserController()
        data = controller.registerUser(user)
        if data:
            session['data'] = data
            return redirect(url_for('index'))
        else:
            alert = 'Este usuario ya existe'
            return redirect(url_for('signin', alert = alert))


@app.route('/sendData', methods = ['POST'])
def sendData():
    data = request.get_json()
    user = User()
    user.id = data['id']
    user.tasks = data['tasks']

    controller = UserController()
    response = controller.send(user)

    if response:
        return jsonify(response)

    alert = 'No se pudo guardar los datos'
    return jsonify(alert)


@app.route('/changeTheme', methods=['POST'])
def changeTheme():
    theme = request.get_json()
    session['theme'] = theme
    print('----------------')
    print(theme)

    return jsonify(theme)


if __name__ == '__main__':
    app.run(debug=True)
