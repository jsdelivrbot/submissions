from flask import Flask, render_template, request, session,redirect,url_for
import csv, unicodedata, requests, sqlite3,json

app = Flask(__name__)

#database functions
def getStories():
    conn = sqlite3.connect("story.db")
    c = conn.cursor()
    c.execute("select * from stories")
    tabledata = c.fetchall()
    final=[]
    
    for n in tabledata:
        d={}
        d['name']=n[0]
        d['story']=n[1]
        d['nameid']=n[2]
        print d
        final.append(d)
    print "TABLEDATA", final
    return tabledata

def getNames():
    names=[]
    conn = sqlite3.connect("story.db")
    c = conn.cursor()
    c.execute("select * from stories")
    tabledata = c.fetchall()
    for d in tabledata:
        names.append(d[0]);
        conn.close()
    names[:]=[unicodedata.normalize('NFKD',o).encode('ascii','ignore') for o in names]
    return names

def addStory(name,story,nameid):
    conn=sqlite3.connect("story.db")
    cursor = conn.cursor()
    initial = "INSERT INTO 'stories'(name,story,id) VALUES ('"+name+"','"+story+"','"+nameid+"')"
    cursor.execute(initial)
    conn.commit()
    conn.close()

def updateStory(name,story):
    conn=sqlite3.connect("story.db")
    cursor = conn.cursor()
    initial = "UPDATE stories SET story='"+story+"' WHERE name='"+name+"';"
    cursor.execute(initial)
    conn.commit()
    conn.close()
#end db functions



@app.route("/")
def index():
    return render_template("index.html")

@app.route("/tales")
def tales():
    return json.dumps(getStories())
    
@app.route("/tale",methods=['GET','POST','PUT','DELETE'])    
@app.route("/tale/<id>",methods=['GET','POST','PUT','DELETE'])    
def tale(id=None):
    method = request.method
    j = request.get_json();
    print method, id, j
    if id ==None:
        id =j['name']
        
    if method == "POST":
        if j["name"] not in getNames():
            addStory(j['name'],j['story'],j['nameid'])
        else:
            updateStory(j['name'],j['story'])
    return json.dumps({'result':j})
        



if __name__ == "__main__":
   app.debug = True
   app.run()
