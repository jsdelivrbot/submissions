from flask import Flask, render_template
# import re
# from pymongo import MongoClient

app = Flask(__name__)
# mongo = MongoClient()
# DB = mongo['DB']

@app.route("/")
def index():
    return render_template("index.html")


# @app.route("/song", methods=["GET", "POST", "DELETE", "PUT"])
# @app.route("/song/<id>", methods=["GET", "POST", "DELETE", "PUT"])

# def song(=None):
#     req = request.get_json();
#     if request.method == "DELETE":
#         db.games.remove({"_id":bson.ObjectId(str(j['id']))})
#     if id == None:
#         id = j['name']
#     if method == "POST":
#             j['_id']=id
#             try:
#                 x = db.songs.update({'_id':id}, req, upsert=True)
#             except:
#                 req.pop("_id", None)
#                 x = db.songs.update({'_id':id}, req)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
