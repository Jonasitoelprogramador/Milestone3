function event_listener_next_input(input1, input2) {
    var vor1 = document.getElementsByClassName(input1);
    var vor2 = vor1[vor1.length - 1];
    vor2.addEventListener("click", input2);
}


event_listener_next_input("next-ingredient", next_input);
event_listener_next_input("edit", edit_input);
event_listener_next_input("done", input_done);
event_listener_next_input("next-step", next_input);
event_listener_next_input("edit-method", edit_input);
event_listener_next_input("done-method", input_done);


function next_input() {
    if (this.className=="btn btn-primary next-step")
    {console.log("step"); 
    var x = document.getElementsByClassName("steps")[0].children[0];
    var d = "btn btn-primary dlt-method"}
    else {
    var x = document.getElementsByClassName("ingredients")[0].children[0];
    console.log("ingredient");
    var d = "btn btn-primary dlt"};
    console.log(x);
    var number = x.parentElement.children.length;
    console.log(number);
    x.children[0].children[2].readOnly = true;
    console.log(x.children[0].children[2]);
    var inpt = document.createElement("div");
    inpt.className = "row";
    inpt.setAttribute = ("type", "text");
    inpt.innerHTML = 
    `<div class="col-md-6">
            <div></div>
            <span style="margin-right: 8px;">${number + 1}.</span>
            <input type="text" class="form-control" id="exampleFormControlInput3" name="ingredients" placeholder="Kosovan">
    </div>
    <div class="col-md-6"> 
            <input type="button" class="${x.parentElement.children[0].children[1].children[0].className}" value="Done">
            <input type="button" class="${x.parentElement.children[0].children[1].children[1].className}" value="Edit">
            <input type="button" class="${d}" value="Delete">
    </div>`;
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
    console.log("yea poo")
    event_listener_next_input("next-ingredient", next_input);
    event_listener_next_input("edit", edit_input);
    event_listener_next_input("done", input_done);
    event_listener_next_input("dlt", delete_input);}
}

function edit_input() {
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
        console.log("ingredients");
    };
   var rows = z;
   var lgth = rows.length;
   console.log(lgth);
   for (var i = 0; i < lgth; i++) {
        span = rows[i].children[0].children[1]
        span.innerHTML = i+1+".";
        span.setAttribute = ("style","display: block;");} 
}
