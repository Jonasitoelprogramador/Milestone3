var next_ingredient = document.getElementById("next-ingredient");
next_ingredient.addEventListener("click", next_input);

function next_input() {
    document.getElementsByClassName("ingredients")[0].lastElementChild.readOnly = true;
    var inpt = document.createElement("input");
    inpt.className = "form-control input-margin";
    inpt.setAttribute = ("type", "text");
    var element = document.getElementsByClassName("ingredients")[0];
    console.log(element);
    element.appendChild(inpt);
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