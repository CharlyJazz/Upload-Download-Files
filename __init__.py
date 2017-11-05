from flask_socketio import SocketIO
from flask import Flask

app = Flask(__name__)

app.config['FILEDIR'] = 'static/files/'

socketio = SocketIO(app)