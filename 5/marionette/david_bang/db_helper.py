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

def story_add (title, line):
    story.update( 
        {'title': title},
        {"$push": {'lines': line}},
    )
    print "Story updated"

def get_story (title):
    s = story.find_one ({'title': title})
    return s


    
    
