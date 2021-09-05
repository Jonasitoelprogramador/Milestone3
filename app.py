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


# This has been inspired by code in CS's project "task manager".  If the URL inputted into the browser matches
# the string "/get_recipes" the server will send through the HTML file associated with the website's homepage and this
# template will be rendered.
@app.route("/")
@app.route("/get_recipes")
def get_recipes():
    recipes = mongo.db.recipes.find()
    return render_template("recipes.html", recipes=recipes, title="Recipes for one and all!", hidden_or_not="hidden")


# This has been taken from CI's example project "task manager".  This gets the session user's username and the recipies 
# from the db and injects these into the profile.html template which is then rendered.  
@app.route("/profile/<username>", methods=["GET", "POST"])
def profile(username):
    username = mongo.db.users.find_one(
        {"username": session["user"]})["username"]
    recipes = mongo.db.recipes.find()


    if session["user"]:
        return render_template(
            "profile.html", username=username, recipes=recipes, title=username+"'s recipes", hidden_or_not="hidden")
    
    return redirect(url_for("login"))


# This has been taken from CI's example project "task manager"
# Renders the logout.html template. and removes user from session cookie
@app.route("/logout")
def logout():
    session.pop("user")
    return redirect(url_for("login"))


# This has been taken from CI's example project "task manager"
# This checks whether a given username and password are already in the db.
@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        # check if username already exists in db
        existing_user = mongo.db.users.find_one(
            {"username": request.form.get("username").lower()})
        # Shows a message saying the username already exists.
        if existing_user:
            return render_template(
                "register.html", title="This user already exists!", hidden_or_not="hidden")
        # If username and password not in the db, a new username and password are added to the db.
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
# Checks if the login details are correct and if so, redirects the user to the profile page and adds the user to the 
# 'session' cookie.  If not, the user is shown an error message.
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
        "login.html", title="Error: username/password.  Think!", hidden_or_not="hidden")

        else:
            # username doesn't exist
            flash("Incorrect Username and/or Password")
            return render_template(
        "login.html", title="Error: username/password.  Think!", hidden_or_not="hidden")

    return render_template(
        "login.html", title="Welcome back!", hidden_or_not="hidden")


# This has been inspired by code in CS's project "task manager"
# Queries the db for recipes that match the input and injects these recipes into the "recipes.html" template which is 
# then rendered. 
@app.route("/search", methods=["GET", "POST"])
def search():
    query = request.form.get("query")
    recipes = list(mongo.db.recipes.find({"$text": {"$search": query}}))
    return render_template("recipes.html", recipes=recipes, title="Voilà!")


# This has been inspired by code in CS's project "task manager
# Checks the request method is post and if so, adds the dictionary to the db.
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
        # Renders the recipes.html template with a feedback message for the user.
        return render_template("recipes.html", title="Added!")
    return render_template("add_recipe.html", title="What is the last recipe you really enjoyed?", hidden_or_not="hidden")


# This has been inspired by code in CS's project "task manager"
# Gets the name and the description of the recipe in question and injects these into the
# more_details template which is then rendered.
@app.route("/more_details/<recipe_id>/", methods=["GET"])
def more_details(recipe_id):
    recipe = mongo.db.recipes.find_one({"_id": ObjectId(recipe_id)})
    recipe_name = recipe["name"]
    recipe_description = recipe['description']
    return render_template(
        "more_details.html", recipe=recipe, title=recipe_name, subtitle=recipe_description)


@app.route("/like_recipe/<recipe_id>/", methods=["GET", "POST"])
def like_recipe(recipe_id):
    # Finds the recipe that has been "liked"
    recipe = mongo.db.recipes.find_one({"_id": ObjectId(recipe_id)})
    # Get the recipe's name and description
    recipe_name = recipe["name"]
    recipe_description = recipe["description"]
    # Adds the username of the session user onto the 'liked_by' attribute of the recipe in question.
    mongo.db.recipes.update({'_id': ObjectId(recipe_id)}, {
        '$push': {'liked_by': session['user']}})
    # Removes the previous string from the 'liked_by' attribute of the recipe in question. 
    mongo.db.recipes.update({'_id': ObjectId(recipe_id)}, {
        '$pull': {'liked_by': "be the first to like this!"}})
    new_recipe = mongo.db.recipes.find_one({'_id': ObjectId(recipe_id)})
    # Renders the more_details template with the below attributes being injected into the template.
    return render_template(
        "more_details.html", recipe=new_recipe, title=recipe_name, subtitle=recipe_description)


# This has been inspired by code in CS's project "task manager"
# Works in a very similar way to add_recipe; if the request is POST, a dictionary is submitted to the db with the new
# attributes for the recipe being edited.
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
                "user": request.form.get("user"),
            }
            mongo.db.recipes.update({"_id": ObjectId(recipe_id)}, submit)
            # The recipes.html page is returned with a message for the user.
            return render_template(
                "recipes.html", title="Changes made!")
    recipe = mongo.db.recipes.find_one({"_id": ObjectId(recipe_id)})
    return render_template("edit_recipe.html", recipe=recipe, title="What do you need to change?", hidden_or_not="hidden")


# This has been inspired by code in CS's project "task manager"
# Finds the recipe that matches the given ID and deletes it from the db.
@app.route("/delete_recipe/<recipe_id>/")
def delete_recipe(recipe_id):
    mongo.db.recipes.remove({"_id": ObjectId(recipe_id)})
    # Renders a recipes.html page with a feedback message for the user 
    return render_template("recipes.html", title="recipe deleted!")


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)

