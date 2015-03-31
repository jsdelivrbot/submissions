from flask import Flask, render_template, request
from pymongo import MongoClient
import json
app = Flask(__name__)


mongo = MongoClient()
db = mongo['notepadAW']
num = db.notes.count()
print num
def toJson(Q):
    for item in Q:
        if "_id" in item:
            item["_id"] = str(item["_id"])
    return json.dumps(Q)


@app.route("/")
def index():
    return render_template("index.html")
@app.route("/notes",methods=['GET','POST','DELETE','PUT'])
def notes():
    if request.method=="POST":
        notes = db.notes
        notes.insert({"content":"asdfasdf"})
    notes = [x  for x in db.notes.find()]
    return json.dumps(toJson(notes))

@app.route("/note",methods=['GET','POST','DELETE','PUT'])
@app.route("/note/<id>",methods=['GET','POST','DELETE','PUT'])
def note(id=None):
    method = request.method
    j = request.get_json()
    global num
    if method == "POST":
        num+=1
        j['_id']= num
        print request.args.get(data)
        try:
            x = db.notes.update({'_id':id},j,upsert=True)
        except:
            j.pop("_id",None)
            x = db.notes.update({'_id':id},j)
        
    print db.notes.find_one()
    return json.dumps({'result':x})


if __name__ == "__main__":
   app.debug = True
   app.run(host="0.0.0.0", port=8000)
