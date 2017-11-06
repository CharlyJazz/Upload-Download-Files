from events import socketio
from flask import Flask
from config import DevelopmentConfig


def create_app():
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)
    socketio.init_app(app)

    from views import app as application
    app.register_blueprint(application)

    return app