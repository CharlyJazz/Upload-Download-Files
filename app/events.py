from flask_socketio import SocketIO
from flask import current_app, request

import os, uuid, json


socketio = SocketIO()


@socketio.on('connected')
def connected():
    print "%s connected" % (request.sid)


@socketio.on('disconnect')
def disconnect():
    print "%s disconnected" % (request.sid)


@socketio.on('start-transfer')
def start_transfer(filename, size):
    """Process an upload request from the client."""
    _, ext = os.path.splitext(filename)
    if ext in ['.exe', '.bin', '.js', '.sh', '.py', '.php']:
        return False  # reject the upload
    id = uuid.uuid4().hex  # server-side filename
    with open(current_app.config['FILEDIR'] + id + '.json', 'wt') as f:
        json.dump({'filename': filename, 'size': size}, f)
    with open(current_app.config['FILEDIR'] + id + ext, 'wb') as f:
        pass
    return id + ext  # allow the upload


@socketio.on('write-chunk')
def write_chunk(filename, offset, data):
    """Write a chunk of data sent by the client."""
    if not os.path.exists(current_app.config['FILEDIR'] + filename):
        return False
    try:
        with open(current_app.config['FILEDIR'] + filename, 'r+b') as f:
            f.seek(offset)
            f.write(data)
    except IOError:
        return False
    return True