from flask import Flask, render_template, request
import json, bson
from pymongo import MongoClient
db = MongoClient()["blogs"]
blogs = db.blogs

app = Flask(__name__)

#deals with BSON object IDs
def myJSON(data):
    for item in data:
        if "_id" in item:
            item["_id"] = str(item["_id"])
    return json.dumps(data)

def addBlog(title,name,text):
    blog = {"title":title,
            "name": name,
            "content": text
    }
    return myJSON({"id":str(blogs.insert(blog))})

def deleteBlog(id):
    blogs.remove({"_id":bson.ObjectId(id)})

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/blogs", methods=["GET","POST","DELETE"])
def places():
    if request.method == "GET":
        return myJSON([i for i in blogs.find()])
    elif request.method == "POST":
        data = request.get_json()
        return addBlog(data["title"],data["name"],data["content"])      
    elif request.method == "DELETE":
        data = request.get_json()
        deleteBlog(data["id"])
        return ""

if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0", port=5000)
