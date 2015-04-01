from flask import Flask, render_template, request
<<<<<<< HEAD
from pymongo import MongoClient
import json

# CANT GET MONGODB TO WORK WITH MARIONETTE

mongo = MongoClient()
db = mongo['story']
tmpid = 0
=======
#from pymongo import Connection
#import json, bson

# CANT GET MONGODB TO WORK WITH MARIONETTE

#conn = Connection()
#db = conn['story']

#story = db.story
>>>>>>> d2b3b92855d7de7ebae39714c4179c56c9106873

app = Flask(__name__)


#def story_creat (line):
#    new = {'lines': line}
#    return json.dumps({'_id':str(story.insert (new))})

def story_add (line):
   return db.story.insert(line)

#def story_get(i):
#    if "_id" in i:
#        i["_id"] = str(item["_id"])
#    return i
                       

#new = {'id': 0,
#       'lines': []
#}
#story.insert (new)
#
#def story_add (line):
#    story.update({'id': 0,
#                  "$push": {'lines': line}}
   # )
#
@app.route("/")#, methods=["POST"])
def index():
 #   if(request.method=="POST"):
 #       story.story_add(request.form["lines"])
    return render_template("index.html") #lines2 = story['lines'])

@app.route("/story", methods=["POST"])
def story():
    global tmpid
    if request.method=="POST":
        line = request.get_json()
        line['_id'] = tmpid
        tmpid += 1
        x = story_add (line)
        return json.dumps(x)
    return ""



if __name__ == "__main__":
<<<<<<< HEAD
    app.debug = True
    app.run(host="0.0.0.0", port=5000)
=======
   app.debug = True
   app.run(host="0.0.0.0", port=5000)
>>>>>>> d2b3b92855d7de7ebae39714c4179c56c9106873
