from flask import Flask, jsonify, render_template, request
from pymongo import Connection

app = Flask(__name__)
app.secret_key='{\xdft\xb7\x06f\x9b\xa4\x0eP\xe1n\xdd\xd4\x93\x01\xd3`\xc1\xe5\xc1|\x0e`'


@app.route("/", methods=["GET","POST","PUT","DELETE"])
def index():
    print [x for x in db.info.find()]
    if request.method == "POST":
        print "hi"
        form = request.form
        db.info.insert({"name":form["add"]})
    return render_template("index.html")

if __name__ == "__main__":
    conn = Connection()
    db = conn['bg']
    app.debug = True
    app.run(host="0.0.0.0", port=8000)
