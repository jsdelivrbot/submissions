from flask import Flask, render_template, request
import json, bson
from pymongo import MongoClient
db = MongoClient()["comments"]
comments = db.comments

app = Flask(__name__)

def myJSON(data):
    for item in data:
        if "_id" in item:
            item["_id"] = str(item["_id"])
    return json.dumps(data)

def addComment(name,text):
    comment = {"name": name,
            "content": text
    }
    return myJSON({"id":str(comments.insert(comment))})


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/comments", methods=["GET","POST","DELETE"])
def places():
    if request.method == "GET":
        return myJSON([i for i in comments.find()])
    elif request.method == "POST":
        data = request.get_json()
        return addComment(data["name"],data["content"])      


if __name__ == "__main__":
   app.debug = True
   app.run(host="0.0.0.0", port=8000)
