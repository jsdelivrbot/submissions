from flask import Flask,render_template
from pymongo import Connection,MongoClient

app=Flask(__name__)

#conn = Connection()
#db = conn['story']

@app.route("/")
def index():
    return render_template("index.html")

if __name__=="__main__":
    app.debug = True
    app.run()
