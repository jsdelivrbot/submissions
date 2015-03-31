from flask import Flask, render_template
from pymongo import MongoClient
import json

app = Flask(__name__)
mongo = MongoClient()
db = mongo["data"]


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/flavors")
def flavors():
    flavors = [x for x in db.flavors.find()]
    return json.dumps(flavors)

@app.route("/place",methods=['GET','POST','DELETE','PUT'])
@app.route("/place/<id>",methods=['GET','POST','DELETE','PUT'])
def flavor(id=None):
    method = request.method
    j = request.get_json();
    if id == None:
        id=j['flavor']

    if method == "POST":
        j['_id']=id
        try:
            x = db.flavors.update({'_id':id},j,upsert=True)
        except:
            j.pop("_id",None)
            x=db.flavors.update({'_id':id},j)

        return json.dumps({'result':x})

if __name__ =="__main__":
    app.debug = True
    app.run(host="0.0.0.0", port = 8000)
