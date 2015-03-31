from flask import Flask, render_template
from pymongo import Connection
import json

conn = Connection()
db = conn['delta']

db.stories.insert({"story":"jesus", "title":"christ"})

#print db.stories.find({"story":"jesus"})[0]["story"]
#print db.stories.find({"story":"jesus"})[0]
words = db.stories.find({"story":"jesus"})[0]["story"]

storyList = [None] * db.stories.count()
print storyList

i = 0
while (i<db.stories.count()):
    storyList[i] = {"story" : db.stories.find({})[i]["story"], "title" : db.stories.find({})[i]["title"]}
    i = i + 1

print storyList

db.stories.remove()


app = Flask(__name__)


@app.route("/")
def index():
    return render_template("app.html", words=words)

@app.route("/stories")
def stories():
    return json.dumps(storyList)
    return



if __name__ == "__main__":
   app.debug = True
   app.run(host="0.0.0.0", port=5000)
   
