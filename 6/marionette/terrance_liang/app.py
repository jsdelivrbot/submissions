from flask import Flask, render_template, request
import sqlite3
import json

app = Flask(__name__)

def add_entry(title,intro,story,rating):
    conn = sqlite3.connect('data.db')
    cursor = conn.cursor()
    request = "INSERT INTO stories (title, intro, story, rating) values ('"+title+"','"+intro+"','"+story+"','"+rating+"')"
    cursor.execute(request)
    conn.commit()
    conn.close()

def rem_entry(title,story):
    conn = sqlite3.connect('data.db')
    cursor = conn.cursor()
    request = "DELETE FROM stories WHERE title='"+title+"' AND story='"+story+"'"
    cursor.execute(request)
    conn.commit()
    conn.close()

def update_story(title,story,update,rating):
    conn = sqlite3.connect('data.db')
    cursor = conn.cursor()
    request = "UPDATE stories SET rating='"+"'"+rating+"',story='"+"'"+update+"' WHERE title='"+title+"' AND story='"+story+"'"
    cursor.execute(request)
    conn.commit()
    conn.close()

def get_Stories():
    conn = sqlite3.connect('data.db')
    cursor = conn.cursor()
    request = "SELECT * FROM stories"
    cursor.execute(request)
    s = cursor.fetchall()
    stories=[]
    for r in s:
        stories.append({'name':r[0],'storyintro':r[1],'story':r[2],'rating':r[3],'storyid':r[0].replace(' ','-')})
    conn.commit()
    conn.close()
    return stories

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/update",methods=["GET","POST"])
def update():
    return json.dumps(get_Stories())

if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0", port=8000)
