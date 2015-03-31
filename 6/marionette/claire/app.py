from flask import Flask, render_template, request, redirect, url_for, session, escape
import mongo 

app = Flask(__name__)
app.secret_key = 'secret'

@app.route("/", methods=["GET","POST"])
@app.route("/index", methods=["GET","POST"])
def index():
    if 'username' in session:
        return redirect(url_for('home'))
    else:
        message = ""
        if request.method=="GET":
            return render_template("index.html", message=message)
        else:
            if request.form['b']=="Log In":
                username = request.form["logusername"]
                password = request.form["logpassword"]
                confirmation = mongo.authenticate(username,password)
                if confirmation != "match":
                    message = confirmation
                    return render_template("index.html", message=message)
                if confirmation == "match":
                    session['username'] = username
                    return redirect(url_for('home'))
            if request.form['b']=="Sign Up":
                username = request.form["signusername"]
                password = request.form["signpassword"]
                password2 = request.form["signpassword2"]
                name = request.form["name"]
                if mongo.user_exists(username) == "exists":
                    message = "Someone already has this username. Please use a different one." 
                    return render_template("index.html", message=message)
                else:
                    if password == password2:
                        mongo.add_user(username,password,name)
                        message = "Registration Sucessful! Log In to get started." 
                        return render_template("index.html", message=message)
                    else:
                        message = "Please make sure your passwords match"
                        return render_template("index.html", message=message)
            if request.form['b']=="Cancel":
                return render_template("index.html", message=message)

@app.route("/home", methods=["GET","POST"])
def home():
    if 'username' in session:
        if request.method=="GET":
            return render_template("home.html")
        else:
            if request.form['b']=="Log Out":
                return redirect(url_for('logout'))
    else:
        return redirect(url_for('index'))

@app.route("/logout")
def logout():
    session.pop('username',None)
    return redirect(url_for('home'))



if __name__ == "__main__":
   app.debug = True
   app.run(host="0.0.0.0", port=8000)
