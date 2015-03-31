from flask import Flask, jsonify, render_template, request
from pymongo import MongoClient
import json, bson

app = Flask(__name__)
app.secret_key='{\xdft\xb7\x06f\x9b\xa4\x0eP\xe1n\xdd\xd4\x93\x01\xd3`\xc1\xe5\xc1|\x0e`'

conn = MongoClient()
db = conn['bg']

@app.route("/")
def index():
    return render_template("index.html")
@app.route("/games")
def games():
    games = [x  for x in db.games.find()]
    return json.dumps(games)

@app.route("/game",methods=['GET','POST','DELETE','PUT'])
@app.route("/game/<id>",methods=['GET','POST','DELETE','PUT'])
def game(id=None):
    method = request.method
    j = request.get_json();
    print method, id, j

    if method == "DELETE":
        print "YES"
        print db.games.remove({"_id":bson.ObjectId(str(j['id']))})
        print "NO"
        return ""

    if id ==None:
        id =j['name']


    if method == "POST":
        #print j["result"]
        j['_id']=id
        try:
            x = db.games.update({'_id':id},j,upsert=True)
        except:
            j.pop("_id",None)
            x = db.games.update({'_id':id},j)
            
    if method == "GET":
        return ""
    return json.dumps({'result':x})




if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0", port=8000)
