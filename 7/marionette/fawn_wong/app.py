from flask import Flask, render_template, request
from pymongo import MongoClient
from bson.objectid import ObjectId
import json

app = Flask(__name__)

mongo = MongoClient()
db = mongo['blogthing']
posts = db.posts
num = posts.count()

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
	print("HELLLLLOOOOOOOOOO")
	data = {
		"_id" : num,
		"title": t,
		"content": c
	}
	json.dumps({"result":str(posts.insert(data))})
	print(json)

def delete(item_id):
	posts.remove({"_id":item_id}, multi=False)

@app.route("/", methods=["POST", "GET", "DELETE", "PUT"])
def index():
	# if request.method == "GET":
	# 	read()
	# elif request.method == "POST":	
	# 	print(request.data)
	# 	data = json.loads(request.data.decode('utf8'))
	# 	if data.has_key("title") and data.has_key("content"):
	# 		create(data["title"], data["content"])
	# elif request.method == "DELETE":
	# 	delete(data["_id"])
	return render_template("index.html")

@app.route("/thread")
def threads():
	# if request.method == "GET":
	# 	return read()
	# elif request.method == "POST":	
	# 	data = json.loads(request.data.decode('utf8'))
	# 	if data.has_key("title") and data.has_key("content"):
	# 		return create(data["title"], data["content"])
	# 	elif data.has_key(" "):
	# 		return delete(data["_id"])
	# 	return ""
	pass

if __name__ == "__main__":
   app.debug = True
   app.run()
