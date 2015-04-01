from flask import Flask, render_template, request
from pymongo import MongoClient

app = Flask(__name__)

mongo = MongoClient()
db = mongo['tasks']

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/task", methods=["GET","POST","DELETE","PUT"])
def add_task(id=None):
	method = request.method
	r = request.get_json()
	if method == "POST":
		r["_id"] = id
	try:
            x = tasks.update({'_id':id},j,upsert=True)
        except:
            r.pop("_id", None)
            x = tasks.update({'_id':id},j)


	print("HELLO")
	print(r["task"])

@app.route("/tasks")
def tasks():
    tasks = [x for x in db.tasks.find()]
    return json.dumps(tasks)

if __name__ == "__main__":
   app.debug = True
   app.run(host="0.0.0.0", port=8000)