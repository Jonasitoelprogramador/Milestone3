function event_listener_next_input() {
    var next_ingredient = document.getElementsByClassName("next-ingredient");
    console.log(next_ingredient.length);
    var the_next_ingredient = next_ingredient[next_ingredient.length - 1];
    console.log(the_next_ingredient);
    the_next_ingredient.addEventListener("click", next_input);}


function event_listener_edit() {
    var edit = document.getElementsByClassName("edit");
    console.log(edit);
    var the_edit = edit[edit.length - 1];
    console.log(the_edit);
    the_edit.addEventListener("click", edit_input);
}


function event_listener_done() {
    var done = document.getElementsByClassName("done");
    console.log(done);
    var the_done = done[done.length - 1];
    console.log(the_done);
    the_done.addEventListener("click", input_done);
}

event_listener_edit()
event_listener_next_input()
event_listener_done()


function next_input() {
    row = document.getElementsByClassName("ingredients")[0].lastElementChild;
    row.children[0].children[1].readOnly = true;
    var inpt = document.createElement("div");
    inpt.className = "row";
    inpt.setAttribute = ("type", "text");
    inpt.innerHTML = 
    `<div class="col-md-6">
            <div></div>
            <input type="text" class="form-control" id="exampleFormControlInput3" name="ingredients" placeholder="Kosovan">
    </div>
    <div class="col-md-6"> 
            <input type="button" class="btn btn-primary next-ingredient" value="Next Ingredient">
            <input type="button" class="btn btn-primary done" value="Done">
            <input type="button" class="btn btn-primary edit" value="Edit">
    </div>`;
    var element = document.getElementsByClassName("ingredients")[0];
    console.log(element);
    element.appendChild(inpt);
    event_listener_next_input();
    event_listener_edit();
    event_listener_done();
}

function edit_input() {
    this.parentElement.previousElementSibling.children[1].readOnly = false;
}


function input_done() {
    this.parentElement.previousElementSibling.children[1].readOnly = true;
}


/*var next_ingredient = document.getElementById("edit");
next_ingredient.addEventListener("click", edit);

function edit() {
    document.getElementsByClassName("ingredients")[0].lastElementChild.readOnly = true;
}

var next_ingredient = document.getElementById("undo-input");
next_ingredient.addEventListener("click", undo_input);

function undo_input() {
    document.getElementsByClassName("ingredients")[0].lastElementChild.readOnly = false;
}*/