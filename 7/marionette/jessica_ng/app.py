from flask import Flask, render_template, request, jsonify, json
from pymongo import MongoClient


app = Flask(__name__)

client = MongoClient()
db = client['marionette']
conn = db['test']

colors = ["red", "orange", "yellow", "green", "blue", "indigo", "purple"]
i = 0

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/ajax/story/<channel>",methods=['GET','POST'])
def ajax_story(channel):
    curChan = conn.find_one({"title":channel.replace("%20"," ")})
    if request.method == "POST":
        pdat = json.loads(request.data)
        newStory = {"content":pdat["content"]}
        curChan["story"].append(newStory)
        if len(curChan["story"]) > 200:
            curChan["story"] = curChan["story"][len(curChan["story"])-200:]
        conn.save(curChan)
    r = ""
    for msg in curChan["story"]:
        global i
        r+="<font color = \""+ colors[i] +"\">%s</font><br>\n" % (msg["content"])
        if i < 6:
            i+=1
        else:
            i = 0
    return jsonify(content=r)

@app.route("/restart")
def restart():
    #clear database every time
    #conn.drop()
    testChan = conn.find_one({"title":"test"})
    if not testChan:
        testChan = {"title":"test",
                    "story":[]}
        conn.insert(testChan)

restart()

if __name__ == "__main__":
   app.debug = True
   app.run(host="0.0.0.0", port=8000)

