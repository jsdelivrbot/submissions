from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")

@app.route('/save_data', methods=['GET', 'POST'])
def sync():
    if request.method == 'GET':
        return read()
    elif request.method == 'POST':
        data = json.loads(request.data)
        if data.has_key('ln')
            ln = data['ln']
            return addToStore(ln)
        return ""


if __name__ == "__main__":
   app.debug = True
   app.run(host="0.0.0.0", port=8000)
