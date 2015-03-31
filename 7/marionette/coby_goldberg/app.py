from flask import Flask, render_template, request
from pymongo import MongoClient
from bson.objectid import ObjectId
import json

app = Flask(__name__)

client = MongoClient()
db = client.todo
collection = db.collection

#for i in collection.find():
 #   print i
  #  print i['name']

#print collection.find({'name': 'C'})

#db.collection.remove()

@app.route("/")
def index():
    return render_template("index.html")

@app.route('/update', methods=['GET', 'POST'])
def update():
    if request.method == 'GET':
        return read()
    elif request.method == 'POST':
        data = json.loads(request.data)
        if data.has_key('name') and\
           data.has_key('period') and\
           data.has_key('comments'):
            name = data['name']
            period = data['period']
            comments = data['comments']
            return add(name, period, comments)
        return ""

@app.route('/update/<item_id>', methods=['PUT', 'DELETE'])
def updateWithID(item_id=None):
    if request.method == 'PUT':
        data = json.loads(request.data)
        if data.has_key('_id') and\
           data.has_key('name') and\
           data.has_key('period') and\
           data.has_key('comments'):
            name = data['name']
            period = data['period']
            comments = data['comments']
            update(item_id, name, period, comments)
        return ""
    elif request.method == 'DELETE':
        delete(item_id)
        return ""

@app.route('/<name>', methods = ['GET', 'POST'])
def teacher_page(name):
    teacher = collection.find({'name': name})
    #print teacher.count()
    #print "hey"
    for i in teacher:
        name = i['name']
        comments = i['comments']
        period = i['period']
    return render_template("teacher_page.html", name = name, period = period, comments = comments)
    

######################## MONGO CODE ####################################

def add(name, period, comments):
    new_teacher = {
        'name': name,
        'period': period,
        'comments': comments
    }
    # Return ID for new item in JSON
    return json.dumps({'_id': str(collection.insert(new_teacher))})

def update(itemId, name, period, comments):
    update_dict = {}
    update_dict['name'] = name
    update_dict['period'] = period
    update_dict['comments'] = comments
    collection.update(
        {'_id': ObjectId(itemId)},
        {'$set': update_dict}
    )


######################## JSON CODE ####################################

def toJSON(cursor):
    js = [cursor[i] for i in range(cursor.count())]
    for d in js:
        d['_id'] = str(d['_id'])
    return json.dumps(js)

def read():
    cursor = collection.find()
    return toJSON(cursor)

if __name__ == "__main__":
    app.debug = True
    app.run(host='0.0.0.0', port=8000)
