from flask import Flask, render_template, request
from pymongo import MongoClient
import json

app = Flask(__name__)
mongo = MongoClient()
db = mongo['game']
thisID=0
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/game")
def game():
    game = [x  for x in db.game.find()]
    return json.dumps(game)

@app.route("/story",methods=['GET','POST','DELETE','PUT'])
@app.route("/story/<id>",methods=['GET','POST','DELETE','PUT'])
def story(id=None):
    global thisID
    method = request.method
    j = request.get_json();
    print method, id, j
    if method == "POST":
        j['_id']=thisID
        thisID = thisID + 1
        x = db.game.insert(j)
        print x
    return json.dumps({'result':x})




if __name__ == "__main__":
    db.game.drop()
    app.debug = True
    app.run(host="0.0.0.0", port=8000)
