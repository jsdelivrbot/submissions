from flask import Flask, render_template, request
import json
app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")

@app.route('/save_data', methods=['GET', 'POST'])
def save_data():
    print 'saving'
    if request.method == 'GET':
        #return top()
        print 'this HAPPPPPENS'
    elif request.method == 'POST':
        data = json.loads(request.data)
        if data.has_key('ln'):
            ln = data['ln']
            return addToStore(ln)
        return ""


if __name__ == "__main__":
   app.debug = True
   app.run(host="0.0.0.0", port=8000)
