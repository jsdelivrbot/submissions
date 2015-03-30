from flask import Flask, render_template, request, jsonify, json
from pymongo import MongoClient


app = Flask(__name__)

client = MongoClient()
db = client['on-maritest']
chatdb = db['test']

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/ajax/chat/<channel>",methods=['GET','POST'])
def ajax_chat(channel):
    curChan = chatdb.find_one({"title":channel.replace("%20"," ")})
    if request.method == "POST":
        pdat = json.loads(request.data)
        newChat = {"author":pdat["author"],
                   "content":pdat["content"]}
        curChan["chat"].append(newChat)
        if len(curChan["chat"]) > 200:
            curChan["chat"] = curChan["chat"][len(curChan["chat"])-200:]
        chatdb.save(curChan)
    r = ""
    for msg in curChan["chat"]:
        r+="&lt;%s&gt; %s<br>\n" % (msg["author"],msg["content"])
    return jsonify(content=r)

def initapp():
    testChan = chatdb.find_one({"title":"test"})
    if not testChan:
        testChan = {"title":"test",
                    "chat":[]}
        chatdb.insert(testChan)

initapp()

if __name__ == "__main__":
   app.debug = True
   app.run(host="0.0.0.0", port=8000)

