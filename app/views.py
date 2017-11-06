from flask import render_template, Blueprint

app = Blueprint('main', __name__)

@app.route('/')
def index():
    return render_template('index.html')