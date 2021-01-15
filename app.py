from flask import Flask
from flask import render_template
from flask import redirect
from flask import url_for
from flask import request
from flask import session
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

    return render_template('index.html')


@app.route('/validate', methods = ['POST', 'GET'])
def validate(): 
    if request.method == 'POST':
        user = User()
        user.name = request.form['userName']
        user.password = request.form['userPass']

        controller = UserController()
        data = controller.get(user)
        session['data'] = data
        print(data)
        return redirect(url_for('index'))
        # user.name = userName
        # user.password = userPass


if __name__ == '__main__':
    app.run(debug=True)
