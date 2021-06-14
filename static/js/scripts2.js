var count = 2;


function event_listener_next_input(input1, input2) {
    var vor1 = document.getElementsByClassName(input1);
    var vor2 = vor1[vor1.length - 1];
    vor2.addEventListener("click", input2);
    row = document.getElementsByClassName("ingredients")[0].lastElementChild;
}


event_listener_next_input("next-ingredient", next_input);
event_listener_next_input("edit", edit_input);
event_listener_next_input("done", input_done);


function next_input() {
    console.log("hello")
    row = document.getElementsByClassName("ingredients")[0].lastElementChild;
    row.children[0].children[2].readOnly = true;
    var inpt = document.createElement("div");
    inpt.className = "row";
    inpt.setAttribute = ("type", "text");
    inpt.innerHTML = 
    `<div class="col-md-6">
            <div></div>
            <span style="margin-right: 8px;">${count}.</span>
            <input type="text" class="form-control" id="exampleFormControlInput3" name="ingredients" placeholder="Kosovan">
    </div>
    <div class="col-md-6"> 
            <input type="button" class="btn btn-primary done" value="Done">
            <input type="button" class="btn btn-primary edit" value="Edit">
            <input type="button" class="btn btn-primary delete" value="Delete">
    </div>`;
    var element = document.getElementsByClassName("ingredients")[0];
    console.log(element);
    element.appendChild(inpt);
    event_listener_next_input("next-ingredient", next_input);
    event_listener_next_input("edit", edit_input);
    event_listener_next_input("done", input_done);
    event_listener_next_input("delete", delete_input);
    return count = count + 1;
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
}
