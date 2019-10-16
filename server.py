from flask import Flask
import os
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)
#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/[YOUR_DATABASE_NAME]'
db = SQLAlchemy(app)


@app.route('/')
def display():
    return "Hello World!"


@app.route('/test')
def test():
    return "Some other page"


if __name__ == '__main__':
    app.run(debug=True, port=int(os.environ["PORT"]))
