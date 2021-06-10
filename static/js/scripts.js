function event_listener() {
    var next_ingredient = document.getElementsByClassName("next-ingredient");
    next_ingredient[len(next_ingredient) - 1]
    next_ingredient.addEventListener("click", next_input);
}

function next_input() {
    document.getElementsByClassName("ingredients")[0].lastElementChild.readOnly = true;
    var inpt = document.createElement("div");
    inpt.className = "row";
    inpt.setAttribute = ("type", "text");
    inpt.innerHTML = 
    `<div class="col-md-6">
            <input type="text" class="form-control" id="exampleFormControlInput3" name="ingredients" placeholder="Kosovan">
    </div>
    <div class="col-md-6"> 
            <input type="button" class="btn btn-primary next-ingredient-class" value="Next Ingredient" id="next-ingredient">
            <input type="button" class="btn btn-primary" value="Done" id="done">
            <input type="button" class="btn btn-primary" value="Back" id="undo-input">
    </div>`;
    var element = document.getElementsByClassName("ingredients")[0];
    console.log(element);
    element.appendChild(inpt);
    event_listener()
}

var next_ingredient = document.getElementById("done");
next_ingredient.addEventListener("click", input_done);

function input_done() {
    document.getElementsByClassName("ingredients")[0].lastElementChild.readOnly = true;
}

var next_ingredient = document.getElementById("undo-input");
next_ingredient.addEventListener("click", undo_input);

function undo_input() {
    document.getElementsByClassName("ingredients")[0].lastElementChild.readOnly = false;
}