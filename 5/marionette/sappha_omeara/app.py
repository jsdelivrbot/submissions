from flask import Flask, render_template
from pymongo import MongoClient
import json

app = Flask(__name__)

mongo = MongoClient()
db = mongo['storydb']

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/lines")
def lines():
    lines = [x for x in db.lines.find()]
    return json.dumps(lines)

@app.route("/line", methods = ["GET", "POST", "DELETE", "PUT"])
def line():
    method = request.method
    j = request.get_json();
    

if __name__ == "__main__":
   app.debug = True
   app.run(host="0.0.0.0", port=8000)
