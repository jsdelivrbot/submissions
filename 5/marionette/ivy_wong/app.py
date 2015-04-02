from flask import Flask, render_template, request
from pymongo import MongoClient
import json

app = Flask(__name__)

mongo = MongoClient()
db = mongo['storydb00']

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/stories")
def stories():
    stories = [x for x in db.stories.find()]
    return json.dumps(stories)

@app.route("/story",methods=['GET','POST','DELETE','PUT'])
@app.route("/story/<id>",methods=['GET','POST','DELETE','PUT'])
def story(id=None):
    method = request.method
    j = request.get_json()
    print method, id, j
    x = "nop" 
    if id == None:
        id = j['name']
        return "welp"

    if method=='PUT':
        j['_id']=id
        try:
            x = db.stories.update({'_id':id},j,upsert=True)
        except:
            j.pop("_id",None)
            x = db.stories.update({"_id":id},j)
    if method=='DELETE':
        try:
            x = db.stories.remove({'_id':id})
        except:
            print "Failed."

    return json.dumps({"result":x})
    

if __name__ == "__main__":
   app.debug = True
   app.run(host="0.0.0.0", port=9000)
