from flask import Flask, render_template, url_for, json, request
from pymongo import MongoClient
#import json
from bson.json_util import dumps, loads

app = Flask(__name__)

client = MongoClient()
db = client['mydb']

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/data", methods=["GET"])
def toBson(): #JSON TO BSON
    members = [x for x in db.members.find()]
    return dumps(members)#convert JSON to BSON
  
def remove(_id):
    return collection.remove({"_id":_id})


@app.route("/ca", methods=['GET','POST','DELETE','PUT'])
@app.route("/ca/<id>", methods=['GET','POST','DELETE','PUT'])
def ind(id=None):
    method = request.method
    mem = request.get_json()
    print request
    #place holder for id numbers (just in case funky things happen)
    if method == "GET":
       toBson();

    if method == "PUT" or method == "POST":
        #add to mongodb  (model.save in backbone sends post request)
        if db.members.find({"id":mem["id"]}):
            db.members.update({"id":mem["id"]},mem, True)
        else:
            db.members.insert(mem)
    elif method == "DELETE":
        #print  db.members.find_one({"id":int(id)}), "\n"
        if db.members.find_one({"id":int(id)}) != None:
            db.members.remove(db.members.find_one({"id":int(id)}))
 
     
    return render_template("family.html")


if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0", port=8000)


