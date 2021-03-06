from flask import Flask, render_template, request
from pymongo import MongoClient,Connection 
import json


app = Flask(__name__)

#mongo = MongoClient()
#db = mongo['story']
conn = Connection()
db = conn ['story']

@app.route('/')
def index(): 
    return render_template('index.html')


@app.route("/line",methods=['GET','POST','DELETE','PUT'])
@app.route("/line/<id>",methods=['GET','POST','DELETE','PUT'])
def line(id=None):
    method = request.method
    j = request.get_json();
    print method, id, j
    if id == None:
        id =j['content']
    
    if method == "POST":
        j['_id']=id
        try:
            x = db.lines.update({'_id':id},j,upsert=True)
        except:
            j.pop("_id",None)
            x = db.lines.update({'_id':id},j)

    return json.dumps({'result':x})
if __name__== '__main__':
    app.debug = True
    app.run(host='127.0.0.1', port=8000)
    
