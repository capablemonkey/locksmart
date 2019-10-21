from flask import Flask
import os
from flask_sqlalchemy import SQLAlchemy
# used by class from sqlalchemy.ext.declarative import declarative_base #used by class
from sqlalchemy import Column, Integer, String, Float
#from sqlalchemy.orm import sessionmaker

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
db = SQLAlchemy(app)


class Rack(db.Model):
    index = db.Column(db.Integer, primary_key=True)
    site_id = db.Column(db.String(255))
    house_number = Column(String(255))
    street_name = Column(String(255))
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)


def get_rack_by_id(id):
    rack = Rack.query.filter_by(site_id=id).first()
    return rack


@app.route('/')
def display():
    test_rack = get_rack_by_id("46203")
    location = test_rack.latitude+test_rack.longitude
    return location


@app.route('/test')
def test():
    return "Some other page"


if __name__ == '__main__':
    app.run(debug=True, port=int(os.environ["PORT"]))
