from flask import Flask, render_template
from flask import request
import sqlite3
import json

app = Flask(__name__)

conn = sqlite3.connect('story.db')
c = conn.cursor()

def create_table(name, attr):
    L = [k+' '+attr[k] for k in attr.keys()]
    s = ','.join(L)
    c.execute("CREATE TABLE %s(%s)" % (name, s))
    conn.commit()

def drop_table(name):
    c.execute("DROP TABLE %s" % (name))
    conn.commit()

def add_story(title, cont):
    conn = sqlite3.connect('story.db')
    c = conn.cursor()
    c.execute("INSERT INTO stories VALUES ('%s','%s')" % (title,cont))
    conn.commit()

def get_stories():
    conn = sqlite3.connect('story.db')
    c = conn.cursor()
    
    
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        stories = get_stories()
        print stories
        return render_template('stories.html', stories = stories)
    else:
        title = request.form['title']
        story = request.form['story']
        # Currently, there is no validation of the title/post
        add_story(title, story)
        return render_template('stories.html',stories=get_stories())

if __name__ == "__main__":
   app.debug = True
   app.run(host="0.0.0.0", port=8000)
