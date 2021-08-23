/* Input1 is the class name of the element to which an event listener will be added and input2 is the function that will be
called when said element is clicked on.  This function finds a list of all of the elements with the given class name and  
selects the last of these to have the event listener added to.*/
function event_listener_next_input(input1, input2) {
    var vor1 = document.getElementsByClassName(input1);
    var vor2 = vor1[vor1.length - 1];
    vor2.addEventListener("click", input2);
}

/* This chunk of code is responsible for adding event listeners to the done, edit, delete and next input buttons.  The first if
clause deals with said buttons on the edit_recipe.html page and the second if clause delas with the buttons on the 
add_recipe.html page.*/
if (document.getElementById("edit h3 title")) {
    ingredient_done = document.getElementsByClassName("done");
    ingredient_edit = document.getElementsByClassName("edit");
    ingredient_delete = document.getElementsByClassName("dlt");
    next_ingredient = document.getElementsByClassName("next-ingredient")[0];
    next_ingredient.addEventListener("click", next_input);
    for (var k = 0; k < ingredient_done.length; k++) {
        ingredient_done[k].addEventListener("click", input_done);
        ingredient_edit[k].addEventListener("click", edit_input);
    }
    for (var g = 0; g < ingredient_delete.length; g++) {
        ingredient_delete[g].addEventListener("click", delete_input);
    }
    method_done = document.getElementsByClassName("done-method");
    method_edit = document.getElementsByClassName("edit-method");
    method_delete = document.getElementsByClassName("dlt-method");
    next_step = document.getElementsByClassName("next-step")[0];
    next_step.addEventListener("click", next_input);
    for (var h = 0; h < method_done.length; h++) {
        method_done[h].addEventListener("click", input_done);
        method_edit[h].addEventListener("click", edit_input)
    }
    for (var j = 0; j < method_delete.length; j++) {
        method_delete[j].addEventListener("click", delete_input);
    }
} else if (document.getElementById("add h3 title")) {
    event_listener_next_input("next-ingredient", next_input);
    event_listener_next_input("edit", edit_input);
    event_listener_next_input("done", input_done);
    event_listener_next_input("next-step", next_input);
    event_listener_next_input("edit-method", edit_input);
    event_listener_next_input("done-method", input_done);
}


/* This code is reponsible for injecting html into either edit_recipe.html or add_recipe.html in order to create a new input
for adding the next step in a recipe's method or the next ingredient. The first two if clauses insert different values into
the html template depending on whether the latter is being injected into edit_recipe.html or add_recipe.html.  The second 
part of this code adds the necessary event listeners to the injected html template. */ 
function next_input() {
    if (this.className == "mx-auto btn btn-primary next-step green-dark-background main-button-add-edit-recipe form-buttons") {
        var x = document.getElementsByClassName("steps")[0].children[0];
        var d = "btn btn-primary dlt-method";
        var nme = "method"
        var w = "70px";
    } else {
        var x = document.getElementsByClassName("ingredients")[0].children[0];
        var d = "btn btn-primary dlt"
        var nme = "ingredients"
    };
    var number = x.parentElement.children.length;
    var w = "30px";
    x.parentElement.children[number - 1].children[2].children[1].readOnly = true;
    if (x == document.getElementsByClassName("steps")[0].children[0]) {
        var template_literal = `Step ${number + 1}:`
        var w = "70px";
        width = "54%"
    } else {
        var template_literal = `${number + 1}.`
        var w = "30px";
        width = "63%"
    }
    var inpt = document.createElement("div");
    inpt.className = ("padding-bottom-10px");
    inpt.innerHTML =
        `<div></div>
    <span style="width: ${w};" class="inline-block text-left">${template_literal}</span>
    <span class="mx-auto inline-block input-box-${nme}" style="width: ${width};">
        <div></div>
        <div></div>
        <input type="text" class="form-control" name="${nme}" placeholder="Kosovan""> 
    </span>
    <span class="top-level-secondary-ingredient-buttons">
        <i type="button" class="${x.parentElement.children[0].children[3].children[0].className}"></i>
        <i type="button" class="${x.parentElement.children[0].children[3].children[1].className}"></i>
        <i type="button" class="fas fa-trash-alt ${d} green-dark-background form-buttons"></i>
    </span>`;
    var element = x.parentElement;
    element.appendChild(inpt);
    if (this.className == "mx-auto btn btn-primary next-step green-dark-background main-button-add-edit-recipe form-buttons") {
        event_listener_next_input("next-step", next_input);
        event_listener_next_input("edit-method", edit_input);
        event_listener_next_input("done-method", input_done);
        event_listener_next_input("dlt-method", delete_input);
    } else {
        event_listener_next_input("next-ingredient", next_input);
        event_listener_next_input("edit", edit_input);
        event_listener_next_input("done", input_done);
        event_listener_next_input("dlt", delete_input);
    }
}

//This allows the user to edit a given input by changes its readOnly value to false.
function edit_input() {
    this.parentElement.previousElementSibling.children[2].readOnly = false;
}

//This prevents the user from further editing a given input by changing its readOnly value to true.
function input_done() {
    this.parentElement.previousElementSibling.children[2].readOnly = true;
}

/*The function deletes a given input and, depending on whether the deleted row input pertained to the method section or the 
ingredients section (the first if clause), correctly renumbers each row with either just the integer (ingredients section)
or the integer and the word 'step' (method section).*/
function delete_input() {
    this.parentElement.parentElement.remove();
    if (this.className == "fas fa-trash-alt btn btn-primary dlt-method green-dark-background form-buttons") {
        var z = document.getElementsByClassName("steps")[0].children;
    } else {
        var z = document.getElementsByClassName("ingredients")[0].children;
    };
    var rows = z;
    var lgth = rows.length;
    for (var i = 0; i < lgth; i++) {
        if (this.className == "fas fa-trash-alt btn btn-primary dlt-method green-dark-background form-buttons") {
            var inner = "Step " + (i + 1) + ":"
        } else {
            var inner = i + 1 + "."
        }
        span = rows[i].children[1]
        span.innerHTML = inner;
        span.setAttribute = ("style", "display: block;");
    }
}

/* This function is used to change the colour of the nav link corresponding to the page the user is currently on.
This is achieved by adding the CSS class 'current-page' to the corresponding link.*/
function nav_link() {
    // this will get the full URL at the address bar
    var url = window.location.href;
    console.log(url)
    // passes on every "a" tag
    links = document.getElementsByClassName("my-nav-links");
    console.log(links);
    var counter = 0;
    for (var i = 0; i < links.length; i++) {
        console.log(links[i].href);
        // checks if it's the same on the address bar
        if (url == links[i].href) {
            counter += 1;
            links[i].className = "my-nav-links white-text current-page";
        }
    }
    if (counter == 0) {
        document.getElementById("home").className = "my-nav-links white-text current-page";
    }
}

nav_link();

// Adds eventlistener to the 'burger' toggle.
var burger = document.getElementById("burger");
burger.addEventListener("click", burger_function)

// Toggle to add/remove the class name 'collapse' which is responsible for collapsing the 'burger' navbar on smaller screens
function burger_function() {
    var nav_bar = document.getElementById("navbarSupportedContent");
    if (nav_bar.className == "collapse") {
        collapse = document.getElementById("navbarSupportedContent");
        collapse.className -= "collapse";
    } else {
        nav_bar.className = "collapse"
    }
}