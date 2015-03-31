from flask import Flask, render_template
from pymongo import MongoClient
import json

app = Flask(__name__)

mongo = MongoClient()
db = mongo['placedb5']


@app.route("/")
def index():
    #return render_template("index.html")
    return render_template("story.html")



if __name__ == "__main__":
   app.debug = True
   app.run()
