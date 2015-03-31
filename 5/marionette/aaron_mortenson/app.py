from flask import Flask,request,redirect,render_template,session,make_response
from pymongo import Connection
from functools import wraps

conn = Connection()
db = conn["teh_database"]
stuff = db["stuff"]

app=Flask(__name__)

def read():
    cursor = collection.find()
    return toJSON(cursor)

def create(username, itemname):
    data = {
        'username': username,
        'itemname': itemname
    }
    return json.dumps({'_id': str(collection.insert(data))})

def delete(item_id):
    collection.remove({'_id': ObjectId(item_id)}, multi=False)

@app.route("/", methods=["GET","POST"])
def home():    
    return render_template("index.html")

@app.route('/sync', methods=['GET', 'POST'])
def sync():
    if request.method == 'GET':
        return read()
    elif request.method == 'POST':
        data = json.loads(request.data)
        if data.has_key('username') and data.has_key('itemname') :
            username = data['username']
            itemname = data['itemname']
            return create(username, itemname)
        return ""
 
if __name__=="__main__":
    app.secret_key="b0kun0p1c0c7f"
    app.debug=True
    app.run();
