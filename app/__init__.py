from .events import socketio
from .config import DevelopmentConfig
from .views import app as application
from flask import Flask


def create_app():
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)
    socketio.init_app(app)
    app.register_blueprint(application)

    return app
