from pymongo import MongoClient
from bson.objectid import ObjectId
import json

client = MongoClient()
db = client.todo
store = db.store

#creds to chesley tan
def toJSON(cursor):
    dicts = [cursor[i] for i in range(cursor.count())]
    # Convert ObjectIds to strings
    for d in dicts:
        d['_id'] = str(d['_id'])
    return json.dumps(dicts)

def addToStore(min, line){
    store.insert({'_id': ObjectId(mid), 'ln':line})
}
    
def update(mid, line):
    try:
        store.update({'_id': ObjectId(mid)}, {'$set': {'ln': line}})
    except:
        pass
        
def remove(mid):
    store.remove({'_id': ObjectId(mid)})