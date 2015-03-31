from flask import Flask, render_template, request
from pymongo import MongoClient
import json

app = Flask(__name__)

mongo = MongoClient()
db = mongo['notesdb']


@app.route("/")
def index():
    return render_template("notes.html")

#---------------- REST CALLS ----------------------------------------

@app.route("/notes")
def notes():
    notes = [x  for x in db.notes.find()]
    return json.dumps(notes)

@app.route("/note",methods=['GET','POST','DELETE','PUT'])
@app.route("/note/<id>",methods=['GET','POST','DELETE','PUT'])
def note(id=None):
    method = request.method
    j = request.get_json();
    print method, id, j

    if id ==None:
        id =j['content']
        
    if method == "POST" or method == "PUT":
        j['_id']=id
        try:
            x = db.notes.update({'_id':id},j,upsert=True)
        except:
            j.pop("_id",None)
            x = db.notes.update({'_id':id},j)
    
    if method == "DELETE":
        x = db.notes.remove({'_id':id})

    return json.dumps({'result':x})
    
if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0", port=8000)
