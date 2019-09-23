from flask import Flask
app = Flask(__name__)


@app.route('/')
def display():
    return "Hello World!"


@app.route('/test')
def test():
    return "Some other page"


if __name__ == '__main__':
    app.run(debug=True)

