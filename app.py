import os
from flask import (
    Flask, flash, render_template,
    redirect, request, session, url_for)
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash 
from bson.objectid import ObjectId
if os.path.exists("env.py"):
    import env


app = Flask(__name__)


app.secret_key = os.environ.get("SECRET_KEY")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")

mongo = PyMongo(app)


# This has been inspired by code in CS's project "task manager"
@app.route("/")
@app.route("/get_recipes")
def get_recipes():
    recipes = mongo.db.recipes.find()
    return render_template("recipes.html", recipes=recipes, title="Recipes for one and all!", subtitle="Welcome to your new home of recipes!", hidden_or_not="hidden")


# This has been taken from CI's example project "task manager"
@app.route("/profile/<username>", methods=["GET", "POST"])
def profile(username):
    # grab the session user's username from db
    username = mongo.db.users.find_one(
        {"username": session["user"]})["username"]
    recipes = mongo.db.recipes.find()


    if session["user"]:
        return render_template(
            "profile.html", username=username, recipes=recipes, title=username+"'s recipes", hidden_or_not="hidden")
    
    return redirect(url_for("login"))


# This has been taken from CI's example project "task manager"
@app.route("/logout")
def logout():
    # remove user from session cookie
    session.pop("user")
    return redirect(url_for("login"))


# This has been taken from CI's example project "task manager"
@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        # check if username already exists in db
        existing_user = mongo.db.users.find_one(
            {"username": request.form.get("username").lower()})

        if existing_user:
            return render_template(
                "register.html", title="This user already exists!", hidden_or_not="hidden")
        
        else:
            register = {
                "username": request.form.get("username").lower(),
                "password": generate_password_hash(request.form.get("password"))
            }
            mongo.db.users.insert_one(register)

            # put the new user into 'session' cookie
            session["user"] = request.form.get("username").lower()
            return redirect(url_for("get_recipes", username=session["user"]))

    return render_template("register.html", title="Get started!", hidden_or_not="hidden")


# This has been taken from CI's example project "task manager"
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        # check if username exists in db
        existing_user = mongo.db.users.find_one(
            {"username": request.form.get("username").lower()})

        if existing_user:
            # ensure hashed password matches user input
            if check_password_hash(
                existing_user["password"], request.form.get("password")):
                session["user"] = request.form.get("username").lower()
                return redirect(url_for("profile", username=session["user"]))
            else:
                # invalid password match
                return render_template(
        "login.html", title="Error: username/password.  Think, dude!", hidden_or_not="hidden")

        else:
            # username doesn't exist
            flash("Incorrect Username and/or Password")
            return render_template(
        "login.html", title="Error: username/password.  Think, dude!", hidden_or_not="hidden")

    return render_template(
        "login.html", title="Welcome back you cheeky monkey", hidden_or_not="hidden")


# This has been inspired by code in CS's project "task manager"
@app.route("/search", methods=["GET", "POST"])
def search():
    query = request.form.get("query")
    recipes = list(mongo.db.recipes.find({"$text": {"$search": query}}))
    return render_template("recipes.html", recipes=recipes, title="Voilà!")


# This has been inspired by code in CS's project "task manager"
@app.route("/add_recipe", methods=["GET", "POST"])
def add_recipe():
    if request.method == "POST":
        recipe = {
            "name": request.form.get("name"),
            "nationality": request.form.get("nationality"),
            "ingredients": request.form.getlist("ingredients"),
            "method": request.form.getlist("method"),
            "description": request.form.get("description"),
            "time": request.form.get("time"),
            "user": session['user'],
            "liked_by": request.form.getlist("liked_by"),
        }
        print(request.form.to_dict())
        mongo.db.recipes.insert_one(recipe)
        return render_template("recipes.html", title="Updated, big swing")
    return render_template("add_recipe.html", title="What is the last recipe you really enjoyed?", hidden_or_not="hidden")


# This has been inspired by code in CS's project "task manager"
@app.route("/more_details/<recipe_id>/", methods=["GET"])
def more_details(recipe_id):
    recipe = mongo.db.recipes.find_one({"_id": ObjectId(recipe_id)})
    recipe_name = recipe["name"]
    recipe_description = recipe['description']
    return render_template(
        "more_details.html", recipe=recipe, title=recipe_name, subtitle=recipe_description)


@app.route("/like_recipe/<recipe_id>/", methods=["GET", "POST"])
def like_recipe(recipe_id):
    recipe = mongo.db.recipes.find_one({"_id": ObjectId(recipe_id)})
    recipe_name = recipe["name"]
    recipe_description = recipe["description"]
    mongo.db.recipes.update({'_id': ObjectId(recipe_id)}, {
        '$push': {'liked_by': session['user']}})
    mongo.db.recipes.update({'_id': ObjectId(recipe_id)}, {
        '$pull': {'liked_by': "be the first to like this!"}})
    new_recipe = mongo.db.recipes.find_one({'_id': ObjectId(recipe_id)})
    return render_template(
        "more_details.html", recipe=new_recipe, title=recipe_name, subtitle=recipe_description)


# This has been inspired by code in CS's project "task manager"
@app.route("/edit_recipe/<recipe_id>/", methods=["GET", "POST"])
def edit_recipe(recipe_id):
    if request.method == "POST":
            submit = {
                "name": request.form.get("name"),
                "nationality": request.form.get("nationality"),
                "ingredients": request.form.getlist("ingredients"),
                "method": request.form.getlist("method"),
                "description": request.form.get("description"),
                "time": request.form.get("time"),
                "liked_by": request.form.getlist("liked_by"),
            }
            mongo.db.recipes.update({"_id": ObjectId(recipe_id)}, submit)
            return render_template(
                "recipes.html", title="Boom!  Changes made, baby")
    recipe = mongo.db.recipes.find_one({"_id": ObjectId(recipe_id)})
    return render_template("edit_recipe.html", recipe=recipe, title="What do you need to change?", hidden_or_not="hidden")


# This has been inspired by code in CS's project "task manager"
@app.route("/delete_recipe/<recipe_id>/")
def delete_recipe(recipe_id):
    mongo.db.recipes.remove({"_id": ObjectId(recipe_id)})
    return render_template("recipes.html", title="recipe deleted!")


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)

