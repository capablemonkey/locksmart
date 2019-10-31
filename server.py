from flask import Flask, jsonify
import os
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Float

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('LARGE_DATABASE_URL') or os.getenv('DATABASE_URL')
db = SQLAlchemy(app)


class Racks(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    site_id = db.Column(db.String(255))
    house_number = db.Column(db.String(255))
    street_name = db.Column(db.String(255))
    latitude = db.Column(db.String(255), nullable=False)
    longitude = db.Column(db.String(255), nullable=False)

    def serialize(self):
        return {'id': self.id,
                'site_id': self.site_id,
                'house_number': self.house_number,
                'street_name': self.street_name,
                'location': {'latitude': self.latitude,
                             'longitude': self.longitude}}


class Crime(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    complaint_number = db.Column(db.String(255))
    description = db.Column(db.String(255))
    offense = db.Column(db.String(255))
    report_date = db.Column(db.Date)
    incident_date = db.Column(db.Date)
    latitude = db.Column(db.String(255), nullable=False)
    longitude = db.Column(db.String(255), nullable=False)

    def serialize(self):
        return {'id': self.id,
                'complaint_number': self.complaint_number,
                'description': self.description,
                'offense': self.offense,
                'report_date': self.report_date,
                'incident_date': self.incident_date,
                'location': {'latitude': self.latitude,
                             'longitude': self.longitude}}


def get_rack_by_id(id):
    rack = Racks.query.filter_by(site_id=id).first()
    return rack.serialize()


def get_racks():
    all_racks = Racks.query.filter_by().all()
    return [rack.serialize() for rack in all_racks]


def get_crimes():
    crimes = Crime.query.filter_by().all()
    return [crime.serialize() for crime in crimes]

@app.route('/')
def hello():
    return jsonify({'hello': 'world!'})

@app.route('/racks', methods=['GET'])
def racks():
    return jsonify(get_racks())


@app.route('/rack/<id>', methods=['GET'])
def rack(id):
    return jsonify(get_rack_by_id(id))


@app.route('/crimes', methods=['GET'])
def crimes():
    return jsonify(get_crimes())


if __name__ == '__main__':
    app.run(debug=True, port=int(os.environ["PORT"]))
