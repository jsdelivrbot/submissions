from flask import Flask, render_template, request
from pymongo import MongoClient
import json

app = Flask(__name__)

#mongo = MongoClient()
#db = mongo['blogthing']
#posts = db.posts

def toJSON(Q):
	dicts = [Q[i] for i in range(Q.count())]
	for item in dicts:
		if "_id" in item:
			item["_id"] = str(item["_id"])
	return json.dumps(dicts)

def read():
	cursor = posts.find()
	return toJSON(cursor)
	
def create(t, c):
	data = {
		"title": t,
		"content": c
	}
	json.dumps({'_id':str(collection.insert(data))})

def delete(t):
	collection.remove({"_id":ObjectId(item_id)}, multi=False)

@app.route("/", methods=["POST", "GET", "DELETE", "PUT"])
def index():
	# read()	
	# data = json.loads(request.data)
	# if request.method == "POST":
	# 	create(data["title"], data["content"])
	# elif request.method == "DELETE":
	# 	delete(data["title"])
	return render_template("index.html")

if __name__ == "__main__":
   app.debug = True
   app.run(host="0.0.0.0", port=8000)
