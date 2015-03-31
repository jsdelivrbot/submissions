from flask import Flask, render_template
from pymongo import Connection

conn = Connection()
db = conn['c']

db.telephone.insert({"tel":"words"})


words = db.stories.find({"tel":"words"})[0]["tel"]



app = Flask(__name__)


@app.route("/")
def index():
    return render_template("home.html", words=words)



if __name__ == "__main__":
   app.debug = True
   app.run()
