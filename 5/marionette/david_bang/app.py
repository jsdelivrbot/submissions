from flask import Flask, render_template, request
from pymongo import MongoClient
import json, bson

# CANT GET MONGODB TO WORK WITH MARIONETTE

mongo = MongoClient()
db = mongo['story']
lines = db.story

#from pymongo import Connection
#import json, bson

# CANT GET MONGODB TO WORK WITH MARIONETTE

#conn = Connection()
#db = conn['story']

#story = db.story

app = Flask(__name__)


#def story_creat (line):
#    new = {'lines': line}
#    return json.dumps({'_id':str(story.insert (new))})

def bsonids(data):
   for item in data:
      if "_id" in item:
         item["_id"] = str(item["_id"])
   return json.dumps(data)

def story_add (l):
   line = {"line": l}
   return bsonids({"id": str(lines.insert(line))})

def story_delete(id):
   lines.remove({"_id":bson.ObjectId(id)})
   
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
@app.route("/", methods = ['GET', 'POST'])
def index():
   #render = lines.find()
  # ret = []

  # for i in render:
  #    ret.append(i['line'])

   return render_template("index.html") #lines2 = story['lines'])

@app.route("/story", methods=['GET','POST','DELETE','PUT'])
def story():
   if request.method == "GET":
      return bsonids([i for i in lines.find()])
   if request.method=="POST":
      line = request.get_json()
      return story_add(line)
   elif request.method == "DELETE":
      data = request.get_json()
      story_delete(data["id"])
      lines.remove({});
      

   
   return render_template("index.html")



if __name__ == "__main__":
   app.debug = True
   app.run(host="0.0.0.0", port=5000)
