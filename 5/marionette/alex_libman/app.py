from flask import Flask, render_template, request
import json
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
    blogs.insert(blog)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/blogs", methods=["GET","POST"])
def places():
    if request.method == "GET":
        return myJSON([i for i in blogs.find()])
    elif request.method == "POST":
        data = request.get_json()
        addBlog(data["title"],data["name"],data["content"])
        return ""      
    
@app.route("/blogs/<data>", methods=["POST"])
def edit(data=None):
    pass
        

if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0", port=5000)
