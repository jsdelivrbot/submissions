from flask import Flask, render_template, request
import sqlite3
import json

conn = sqlite3.connect('data.db')
c = conn.cursor()

app = Flask(__name__)


## Database code taken from BOSE-blog project ##
    
def create_table(name, attr):
    """Creates a table in the database \'blog.db\'

    1st parameter - name of table (string)
    2nd parameter - Dictionary with keys and types as values'
    """
    print name
    L = [k+' '+attr[k] for k in attr.keys()]
    s = ','.join(L)
    c.execute("CREATE TABLE %s(%s)" % (name, s))
    conn.commit()
    print ("CREATE TABLE %s(%s)") % (name, s)

def drop_table(name):
    c.execute("DROP TABLE %s" % (name))
    conn.commit()
    print ("DROP TABLE %s" % (name))

def add_entry(title):
    conn = sqlite3.connect('data.db')
    c = conn.cursor()
    c.execute("INSERT INTO entries VALUES ('%s')" %(title))
    conn.commit()
    print 'added %s to entries' % (title)

def add_comment(entry,content):
    conn = sqlite3.connect('data.db')
    c = conn.cursor()
    c.execute("INSERT INTO comments VALUES ('%s','%s')" % (content,entry))
    conn.commit()
    print 'added comment to %s' % (entry)

def get_entries():
    """returns a list of entries"""
    conn = sqlite3.connect('data.db')
    c = conn.cursor()
    entries = []
    for row in c.execute("SELECT rowid,* FROM entries"):
        entries.append({'id':row[0],'name':row[1]})
    return entries
        
def get_comments(entry):
    conn = sqlite3.connect('data.db')
    c = conn.cursor()
    """returns comments from given entry"""
    command = "SELECT rowid,comment FROM comments WHERE entry='%s';"%(entry)
    print "getting comments from "+`entry`
    print "here's the result: "+`c.execute(command)`
    comments = []
    for row in c.execute(command):
        comments.append({'id':row[0], 'content':row[1]})
    print comments
    ##return [row[0] for row in c.execute(command).fetchall()]
    return comments
        

@app.route("/")
def index():
    return render_template("index.html")

@app.route('/entries',methods=["GET","POST"])
def handle_entry_request():
    if request.method=="GET":
        return json.dumps(get_entries())
    else:
        add_entry(request.json['name'])
        return 'Added Entry'
        
@app.route('/comments',methods=["GET","POST"])
def handle_comment_request():
    if request.method=="GET":
        e = request.args.get('entry')
        print 'given value for entry: %s' %(e)
        return json.dumps(get_comments(e))
    else:
        add_comment(request.json['entry'],request.json['content'])
        return 'Added Comment'
    
@app.route('/resetdb')
def create_tables():
    drop_table('entries')
    drop_table('comments')
    create_table('entries', {'title':'text'})
    create_table('comments',{'entry':'text', 'comment':'text'})
    return redirect('/')
    
if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0", port=8000)
