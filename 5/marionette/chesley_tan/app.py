from flask import Flask, render_template, request
import json
from dbhelper import *
app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/sync', methods=['GET', 'POST'])
def sync():
    if request.method == 'GET':
        return read()
    elif request.method == 'POST':
        data = json.loads(request.data)
        if data.has_key('done') and\
           data.has_key('description') and\
           data.has_key('urgency'):
            done = data['done']
            description = data['description']
            urgency = data['urgency']
            return create(description, urgency, done)
        return ""

@app.route('/sync/<item_id>', methods=['PUT', 'DELETE'])
def syncWithID(item_id=None):
    if request.method == 'PUT':
        data = json.loads(request.data)
        if data.has_key('_id') and\
           data.has_key('done') and\
           data.has_key('description') and\
           data.has_key('urgency'):
            done = data['done']
            description = data['description']
            urgency = data['urgency']
            update(item_id, description, urgency, done)
        return ""
    elif request.method == 'DELETE':
        delete(item_id)
        return ""

if __name__ == '__main__':
   app.debug = True
   app.run(host='0.0.0.0', port=8000)
