from flask import Flask, render_template, url_for, json, request
from pymongo import MongoClient
#import json
from bson.json_util import dumps

app = Flask(__name__)

client = MongoClient()
db = client['mydb']
print "hello"
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/data", methods=["GET"])
def data():
    db.members.insert({"name":"Richar"})
    L=[]
    for y in db.members.find():
        try:
            y["_id"] = int(y["priority"])
        except:
            y["_id"] = 20
        L.append(y)
    members = [x for x in L]
   
    return dumps(members)

def remove(_id):
    return collection.remove({"_id":_id})


@app.route("/ca", methods=['GET','POST','DELETE','PUT'])
@app.route("/ca", methods=['GET','POST','DELETE','PUT'])
def ind():
    method = request.method
    mem = request.get_json()
    if method == "POST":
        #add to mongodb
        _id = mem["priority"]
        print method, mem, _id
        db.members.insert(mem)
    #data()
   
    
    
    return render_template("family.html")


if __name__ == "__main__":
    print "HASDF"
    app.debug = True
    app.run(host="0.0.0.0", port=8000)



'''

Marionette vs Backbone

posititves of marionette -> gets around the backbone event leaks


Deals with View Management
Views do not have to be hard coded
  for example, you can make a template for a view in marionette


'''
