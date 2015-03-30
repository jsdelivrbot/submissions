from pymongo import Connection

conn = Connection()
db = conn['story']

story = db.story

def story_creat (title, line):
    new = {'title': title,
           'lines': line
           }
    story.insert (new)
    print "Story inserted"


    
    
