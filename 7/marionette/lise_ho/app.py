from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")



if __name__ == "__main__":
   app.debug = True
   app.run(host="0.0.0.0", port=8000)



'''

Marionette vs Backbone

posititves of marionette -> gets around the backbone event leaks


Deals with View Management
Views do not have to be hard coded
  for example, you can make a template for a view in marionette


'''
