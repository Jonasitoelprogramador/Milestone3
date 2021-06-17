import os
from flask import (
    Flask, flash, render_template,
    redirect, request, session, url_for)
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
if os.path.exists("env.py"):
    import env


app = Flask(__name__)

app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")

mongo = PyMongo(app)

@app.route("/")
@app.route("/get_recipes")
def get_recipes():
    recipes = mongo.db.recipes.find()
    return render_template("recipes.html", recipes=recipes)

@app.route("/add_recipe", methods=["GET", "POST"])
def add_recipe():
    if request.method == "POST":
        recipe = {
            "name": request.form.get("name"),
            "nationality": request.form.get("nationality"),
            "ingredients": request.form.getlist("ingredients"),
            "method": request.form.getlist("method"),
            "description": request.form.get("description"),
            "cook-time": request.form.get("cook-time"),
        }
        print(request.form.to_dict())
        mongo.db.recipes.insert_one(recipe)
        return render_template("recipes.html", message="recipe submitted!")
    return render_template("add_recipe.html")


@app.route("/more_details/<recipe_id>/", methods=["GET"])
def more_details(recipe_id):
    recipe = mongo.db.recipes.find_one({"_id": ObjectId(recipe_id)})
    return render_template("more_details.html", recipe=recipe)


@app.route("/edit_recipe/<recipe_id>/", methods=["GET", "POST"])
def edit_recipe(recipe_id):
    if request.method == "POST":
        submit = {
            "name": request.form.get("name"),
            "nationality": request.form.get("nationality"),
            "ingredients": request.form.getlist("ingredients"),
            "method": request.form.getlist("method"),
            "description": request.form.get("description"),
            "cook-time": request.form.get("cook-time"),
        }
        print(request.form.to_dict())
        mongo.db.recipes.update({"_id": ObjectId(recipe_id)}, submit)
        return render_template("recipes.html", message="recipe updated!")
    recipe = mongo.db.recipes.find_one({"_id": ObjectId(recipe_id)})
    return render_template("edit_recipe.html", recipe=recipe)


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)

