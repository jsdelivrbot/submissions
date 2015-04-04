from flask import Flask, render_template, request
from pymongo import MongoClient
from bson.objectid import ObjectId
import json

app = Flask(__name__)

mongo = MongoClient()
db = mongo['blogthing']
posts = db.posts

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
	return json.dumps({'_id': str(posts.insert(data))})

def delete(item_id):
	posts.remove({'_id': ObjectId(item_id)}, multi=False)

@app.route("/", methods=["POST", "GET", "DELETE", "PUT"])
def index():
	return render_template("index.html")

@app.route("/threads", methods=['GET', 'POST'])
def threads():
	if request.method == 'GET':
		return read()
	elif request.method == 'POST':
		try:
			data = json.loads(request.data)
		except:
			data = json.loads(request.data.decode("utf8"))
		if 'title' in data and 'content' in data:
			return create(data['title'], data['content'])
		return ""

@app.route('/thread/<id>', methods=['DELETE'])
def thread(id = None):
	if request.method == 'DELETE':
		delete(id)
		return ""


if __name__ == "__main__":
   app.debug = True
   app.run(host='0.0.0.0', port=8000)
