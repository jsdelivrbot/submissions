from flask import Flask, render_template, request
import json
from pymongo import MongoClient

#db = MongoClient()['database']
#position = db['position'] #collection


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=8000)
