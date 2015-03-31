from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.proj
users = db.users

def add_user(username,password,name):
    user = {
        'username' : username,
        'password' : password,
        'name' : name,
        'wishlist': "empty"
    }
    return users.insert(user)

def user_exists(username):
    user = users.find_one({'username': username})
    if user == None:
        return "does not exist"
    else:
        return "exists"

def authenticate( username, passw ):
    user = users.find_one({'username': username})
    if user  == None:
        return "Username does not exist"
    elif user['password'] != passw:
        return "Password and username do not match"
    return "match"

def get_wishlist( username ):
	user = db.users.find({'username':username}, {'wishlist':1})
	if user == None:
		return "Username does not exist"
	else:
		return user.next()['wishlist']

def add_to_wishlist( movietitle, username ):
	user = db.users.find({'username':username}, {'wishlist':1})
	if user == None:
		return "Username does not exist"
	wishlist = user.next()['wishlist']
	if wishlist=="empty":
		wishlist = []
	wishlist.append(movietitle)
	db.users.update({'username':username},{"$set": {"wishlist": wishlist}})
