from pymongo import MongoClient
from bson.objectid import ObjectId
import json

client = MongoClient()
db = client.todo
collection = db.collection

def toJSON(cursor):
    dicts = [cursor[i] for i in range(cursor.count())]
    # Convert ObjectIds to strings
    for d in dicts:
        d['_id'] = str(d['_id'])
    return json.dumps(dicts)

def read():
    cursor = collection.find()
    return toJSON(cursor)

def create(description, urgency, done):
    data = {
        'description': description,
        'urgency': urgency,
        'done': done
    }
    # Return ID for new item in JSON
    return json.dumps({'_id': str(collection.insert(data))})

def delete(item_id):
    collection.remove({'_id': ObjectId(item_id)}, multi=False)

def update(itemId, description, urgency, done):
    try:
        update_dict = {}
        update_dict['description'] = description
        update_dict['urgency'] = urgency
        update_dict['done'] = done
        collection.update(
            {'_id': ObjectId(itemId)},
            {'$set': update_dict}
        )
    except: # _id does not exist
        pass
