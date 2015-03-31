from flask import Flask, render_template, request
import json
import db
app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/post", methods=['GET','POST'])
def post():
    if request.method == "GET":
        return render_template("index.html")
    elif request.method == "POST":
        data = 

if __name__ == "__main__":
   app.debug = True
   app.run(host="0.0.0.0", port=8000)
