var next_ingredient = document.getElementById("next-ingredient");
next_ingredient.addEventListener("click", next_input);

function next_input() {
    var inpt = document.createElement("input");
    inpt.className("btn btn-primary");
    var element = document.getElementsByClassName("ingredients");
    element.appendChild(inpt);
}