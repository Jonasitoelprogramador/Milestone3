function event_listener_next_input(input1, input2) {
    var vor1 = document.getElementsByClassName(input1);
    console.log(vor1);
    var vor2 = vor1[vor1.length - 1];
    console.log(vor2);
    vor2.addEventListener("click", input2);
}


if (document.getElementById("edit h3 title")) {
    ingredient_done = document.getElementsByClassName("done");
    ingredient_edit = document.getElementsByClassName("edit");
    ingredient_delete = document.getElementsByClassName("dlt");
    next_ingredient = document.getElementsByClassName("next-ingredient")[0];
    next_ingredient.addEventListener("click", next_input);
    for (var k = 0; k < ingredient_done.length; k++) {
    ingredient_done[k].addEventListener("click", input_done);
    ingredient_edit[k].addEventListener("click", edit_input);}
    for (var g = 0; g < ingredient_delete.length; g++) {
    ingredient_delete[g].addEventListener("click", delete_input);}
    ingredient_done = document.getElementsByClassName("done-method");
    ingredient_edit = document.getElementsByClassName("edit-method");
    ingredient_delete = document.getElementsByClassName("dlt-method");
    next_ingredient = document.getElementsByClassName("next-step")[0];
    next_ingredient.addEventListener("click", next_input);
    for (var h = 0; h < ingredient_done.length; h++) {
    ingredient_done[h].addEventListener("click", input_done);
    ingredient_edit[h].addEventListener("click", edit_input)}
    for (var j = 0; j < ingredient_delete.length; j++) {
    ingredient_delete[j].addEventListener("click", delete_input);
    }}
else if (document.getElementById("add h3 title")) {

    event_listener_next_input("next-ingredient", next_input);
    event_listener_next_input("edit", edit_input);
    event_listener_next_input("done", input_done);
    event_listener_next_input("next-step", next_input);
    event_listener_next_input("edit-method", edit_input);
    event_listener_next_input("done-method", input_done);
}


function next_input() {
    if (this.className=="btn btn-primary next-step"){
        console.log("step"); 
        var x = document.getElementsByClassName("steps")[0].children[0];
        var d = "btn btn-primary dlt-method";
        var nme = "method"
    }
    else {
        var x = document.getElementsByClassName("ingredients")[0].children[0];
        var d = "btn btn-primary dlt"
        var nme = "ingredients"};
        var number = x.parentElement.children.length;
        x.parentElement.children[number - 1].children[2].children[1].readOnly = true;
    if (x == document.getElementsByClassName("steps")[0].children[0]) {
        var template_literal = `Step ${number + 1}:`
    }
    else {
        var template_literal = `${number + 1}.`
    }
    var inpt = document.createElement("div");
    inpt.setAttribute = ("type", "text");
    inpt.innerHTML = 
    `<div></div>
    <span style="width: 30px;" class="inline-block text-left">${template_literal}</span>
    <span class="mx-auto inline-block" style="width: 63%;">
        <div></div>
        <div></div>
        <input type="text" class="form-control" name="ingredients" placeholder="Kosovan""> 
    </span>
    <span class="top-level-secondary-ingredient-buttons" style="width: 50%;">
        <i type="button" class="${x.parentElement.children[0].children[3].children[0].className}"></i>
        <i type="button" class="${x.parentElement.children[0].children[3].children[1].className}"></i>
        <i type="button" class="far fa-trash-alt ${d} green-dark-background "></i>
    </span>`;
    console.log(x.parentElement.children[0].children[1].children[1]);
    var element = x.parentElement;
    console.log(element);
    element.appendChild(inpt);
    if (this.className=="btn btn-primary next-step") {
        event_listener_next_input("next-step", next_input);
        event_listener_next_input("edit-method", edit_input);
        event_listener_next_input("done-method", input_done);
        event_listener_next_input("dlt-method", delete_input);}
    else {
        event_listener_next_input("next-ingredient", next_input);
        event_listener_next_input("edit", edit_input);
        event_listener_next_input("done", input_done);
        event_listener_next_input("dlt", delete_input);}
}

function edit_input() {
    console.log(this);
    this.parentElement.previousElementSibling.children[2].readOnly = false;
}


function input_done() {
    console.log(this);
    this.parentElement.previousElementSibling.children[2].readOnly = true;
}


function delete_input() {
   this.parentElement.parentElement.remove();
   if (this.className=="btn btn-primary dlt-method")
        {console.log("method"); 
        var z = document.getElementsByClassName("steps")[0].children;
    }
    else {
        var z = document.getElementsByClassName("ingredients")[0].children;
        console.log(z);
    };
   var rows = z;
   var lgth = rows.length;
   console.log(lgth);
   for (var i = 0; i < lgth; i++) {
        if (this.className=="btn btn-primary dlt-method") {
            var inner = "Step "+(i+1)+":"
        }
        else {
            var inner = i+1+"."
        }
        span = rows[i].children[1]
        span.innerHTML = inner;
        span.setAttribute = ("style","display: block;");} 
}
