from flask import Flask, render_template
from pymongo import MongoClient
import json

app = Flask(__name__)
mongo = MongoClient()
db = mongo['blogdb']

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/posts")
def posts:
    posts = [x for x in db.posts.find()]
    return json.dumps(posts)

@app.route("/post",methods=["GET","POST","DELETE","PUT"])
@app.route("/post/<id>",methods=["GET","POST","DELETE","PUT"])
def post(id=None):
    method = request.method
    j = request.get_json();
    print method, id, j
    if id==None:
        id = j['name']
    if method == "POST":
        j['_id'] = id
        try:
            x = db.lines.update({'_id':id},j,upsert=True)
        except:
            j.pop("_id", None)
            x = db.lines.update({'_id':id},j)
                            


if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0", port=8000)
