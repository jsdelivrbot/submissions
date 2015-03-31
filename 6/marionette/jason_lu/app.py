from flask import Flask,request,redirect,render_template,session,make_response
from pymongo import Connection

conn = Connection()
db = conn["database"]
stuff = db["stuff"]

app = Flask(__name__)

def create(name, comment, likes):
    data = {
    'name': name,
    'comment': comment,
    'likes' : likes
    }
return json.dumps({'_id': str(collection.insert(data))})

def read():
    things = collection.find()
    return toJSON(things)

@app.route("/")
def index():
    return render_template("index.html")

@app.route('/post', methods=['GET', 'POST'])
def post():
    if request.method == 'GET':
        return read()
    elif request.method == 'POST':
        data = json.loads(request.data)
        if data.has_key('name') and data.has_key('comment') and data.has_key('likes') :
            name = data['name']
            comment = data['comment']
            likes = data['likes']
            return create(name, comment, likes)
        return ""

if __name__ == "__main__":
   app.debug = True
   app.run(host="0.0.0.0", port=8000)
