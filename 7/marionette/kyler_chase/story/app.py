from flask import Flask, render_template
from pymongo import Connection

conn = Connection()
db = conn['delta']

db.stories.insert({"story":"jesus"})

print db.stories.find({"story":"jesus"})[0]["story"]
words = db.stories.find({"story":"jesus"})[0]["story"]



app = Flask(__name__)


@app.route("/")
def index():
    return render_template("app.html", words=words)



if __name__ == "__main__":
   app.debug = True
   app.run(host="0.0.0.0", port=5000)
