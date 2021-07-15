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
    
    method_done = document.getElementsByClassName("done-method");
    method_edit = document.getElementsByClassName("edit-method");
    method_delete = document.getElementsByClassName("dlt-method");
    next_step = document.getElementsByClassName("next-step")[0];
    next_step.addEventListener("click", next_input);
    for (var h = 0; h < method_done.length; h++) {
    method_done[h].addEventListener("click", input_done);
    method_edit[h].addEventListener("click", edit_input)}
    for (var j = 0; j < method_delete.length; j++) {
    method_delete[j].addEventListener("click", delete_input);
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
    if (this.className=="mx-auto btn btn-primary next-step green-dark-background main-button-add-edit-recipe"){
        console.log("step"); 
        var x = document.getElementsByClassName("steps")[0].children[0];
        var d = "btn btn-primary dlt-method";
        var nme = "method"
        var w = "70px";
    }
    else {
        var x = document.getElementsByClassName("ingredients")[0].children[0];
        var d = "btn btn-primary dlt"
        var nme = "ingredients"};
        var number = x.parentElement.children.length;
        var w = "30px";
        x.parentElement.children[number - 1].children[2].children[1].readOnly = true;
    if (x == document.getElementsByClassName("steps")[0].children[0]) {
        var template_literal = `Step ${number + 1}:`
        var w = "70px";
        width = "54%"
    }
    else {
        var template_literal = `${number + 1}.`
        var w = "30px";
        width = "63%"
    }
    var inpt = document.createElement("div");
    inpt.setAttribute = ("type", "text");
    inpt.innerHTML = 
    `<div></div>
    <span style="width: ${w};" class="inline-block text-left">${template_literal}</span>
    <span class="mx-auto inline-block" style="width: ${width};">
        <div></div>
        <div></div>
        <input type="text" class="form-control" name="ingredients" placeholder="Kosovan""> 
    </span>
    <span class="top-level-secondary-ingredient-buttons" style="width: 50%;">
        <i type="button" class="${x.parentElement.children[0].children[3].children[0].className}"></i>
        <i type="button" class="${x.parentElement.children[0].children[3].children[1].className}"></i>
        <i type="button" class="fas fa-trash-alt ${d} green-dark-background"></i>
    </span>`;
    console.log(x);
    var element = x.parentElement;
    console.log(element);
    element.appendChild(inpt);
    if (this.className=="mx-auto btn btn-primary next-step green-dark-background main-button-add-edit-recipe") {
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
   if (this.className=="fas fa-trash-alt btn btn-primary dlt-method green-dark-background")
        {console.log("method"); 
        var z = document.getElementsByClassName("steps")[0].children;
    }
    else {
        var z = document.getElementsByClassName("ingredients")[0].children;
        console.log("hello");
    };
   var rows = z;
   var lgth = rows.length;
   console.log(lgth);
   for (var i = 0; i < lgth; i++) {
        if (this.className=="fas fa-trash-alt btn btn-primary dlt-method green-dark-background") {
            var inner = "Step "+(i+1)+":"
        }
        else {
            var inner = i+1+"."
        }
        span = rows[i].children[1]
        span.innerHTML = inner;
        span.setAttribute = ("style","display: block;");} 
}
