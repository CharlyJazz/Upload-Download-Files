from app import create_app, socketio

app = create_app()

socketio.run(app, debug=True, port=8000)
