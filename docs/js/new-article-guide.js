"use strict";

//Global Variables
const default_username_text = "GitHub username...";
const default_permalink_text = "YOUR-PERMALINK-HERE...";
var username = '';
var permalink = '';

//Helpers
function createTextInput(defaultVal) {
    var input = document.createElement("input"); 
    input.type="text"; 
    input.value=defaultVal;
    input.onfocus = function() {
        if(input.value == defaultVal) {input.value = "";}
    };
    input.onblur = function() {
        if(input.value == "") {input.value = defaultVal;}
    };
    input.basicValidate = function() {
        return !(input.value == '' || input.value == defaultVal); //Dont accept nothing/ default values
    };
    return input;
}
//ID and NAME tokens must begin with a letter ([A-Za-z]) 
//and may be followed by any number of 
//letters, digits ([0-9]), hyphens ("-"), underscores ("_"), colons (":"), and periods (".").
function convertStrToID(string){
    return string.replace(
        /^[^a-zA-Z]*/g,'').replace( //Get rid of everything in the beginning thats not correct
        /[ ]+/g,'-').replace( //Replace spaces with hyphens
        /[-_:.]+$/g,'').replace( //For style, remove weird characters at the end
        /[^\w-:.]/g, ''); //finally remove all invalid characters
}

//Alphanumeric with single hyphens (no consecutive hyphens)
//Cannot begin or end with a hyphen (if it ends with a hyphen, just match everything up until there)
//Max length of 39 characters.
function isValidGithubUsername(username){
    var regex = new RegExp(/^([a-z0-9](?:-?[a-z0-9]){0,38})$/, 'i');
    return regex.test(username);
}


//Functions
function createTextSaveForm(defaultVal, description, validatorCB){
    var textForm = document.createElement("div");
    textForm.input = createTextInput(defaultVal);
    textForm.appendChild(textForm.input);
    textForm.isTextSave= true;
    textForm.defaultVal= defaultVal;
    textForm.description = description;
    textForm.id = convertStrToID(description);
    textForm.isValid = false;
    textForm.validCBs = [];
    textForm.invalidCBs = [];
    textForm.validateInput = function() {
        if(!textForm.input.basicValidate()){
            textForm.isValid = false;
            textForm.invalidCBs.forEach(function(invalidCB) {
                invalidCB(textForm.input.value);
            },this);
        }
        else if(typeof validatorCB === 'function' && !validatorCB(textForm.input.value)){
            textForm.isValid = false;
            textForm.invalidCBs.forEach(function(invalidCB) {
                invalidCB(textForm.input.value);
            },this);
        }
        else{
            textForm.isValid = true;
            textForm.validCBs.forEach(function(validCB) {
                validCB(textForm.input.value);
            },this);
        }
    };
    //Validate input on text change
    textForm.input.addEventListener('change', textForm.validateInput);
    textForm.input.addEventListener('propertychange', textForm.validateInput);
    textForm.input.addEventListener('input', textForm.validateInput);
    //Handlers to add cbs
    textForm.whenValid = function(doThisCB){
        textForm.validCBs.push(doThisCB);
    };
    textForm.whenInvalid = function(doThisCB){
        textForm.invalidCBs.push(doThisCB);
    };
    textForm.whenValid(function(){textForm.classList.remove("invalid");});
    textForm.whenInvalid(function(){textForm.classList.add("invalid");});
    return textForm;
}

function createButtonForm(buttonText, urlInputs) {    
    //Create wrapper
    var buttonForm = document.createElement("div");
    buttonForm.errors = {};
    buttonForm.activeErrors = 0;
    //Create button
    var button = document.createElement("button"); 
    button.type = "button"; 
    button.appendChild(document.createTextNode(buttonText));
    //Attach button to form
    buttonForm.appendChild(button);
    buttonForm.button = button;
    //Attach url inputs to button form (if they exist)
    if(urlInputs) {
        var copy = [].slice.call(arguments);
        copy.splice(0,1,buttonForm);
        attachTextInputsToButton.apply(this, copy);
    }
    
    //Callback if we get a bad button input.
    buttonForm.badInputCB = function(textInput){
        //Check if we already have this error
        if(buttonForm.errors[textInput.id]){
            if(document.getElementById(buttonForm.errors[textInput.id].id)){
                //Error exists in dom; do nothing                
            }
            else{
                //Add it back to the dom
                buttonForm.appendChild(buttonForm.errors[textInput.id]);
                buttonForm.activeErrors += 1;
            }
        }
        else{
            //Create a new error span
            var error = document.createElement("span");
            buttonForm.errors[textInput.id] = error;
            error.class = "input-error";
            error.id = "error-" + textInput.id + "-" + Math.random();
            error.appendChild(document.createTextNode("Please fill out a valid " + textInput.description + " above."));
            buttonForm.appendChild(error);
            buttonForm.activeErrors += 1;
        }
    };
    buttonForm.removeError = function(textInput){
        if(!buttonForm.errors[textInput.id] || !document.getElementById(buttonForm.errors[textInput.id].id)){ 
            return; //only remove errors if they exist and are in dom
        }        
        buttonForm.removeChild(buttonForm.errors[textInput.id]);
        buttonForm.activeErrors -= 1;
    };
    return buttonForm;
}

function attachTextInputsToButton(buttonForm, textSavesORstaticstrings) {
    buttonForm.urlComps = [];
    buttonForm.textInputs = [];
    //Build the lists of dynamic and static strings.
    for (var i = 1; i < arguments.length; i++) {
        var arg = arguments[i];
        if(typeof arg === "string"){
        } else if (typeof arg === 'object' && arg.isTextSave === true){
            buttonForm.textInputs.push(arg);
        }
        else{
            continue;
        }
        buttonForm.urlComps.push(arg);
    }

    buttonForm.textInputs.forEach(function(textInput) {
        //Update the form link and remove the error when the user fixes the problem.
        textInput.whenValid(function() {
            buttonForm.link = '';
            for(let comp of buttonForm.urlComps){
                if(typeof comp === "string"){
                    buttonForm.link += comp;
                }
                else{
                    buttonForm.link += encodeURIComponent(comp.input.value);
                }
            }
            buttonForm.removeError(textInput);
        });
        //Make sure all inputs are validated 
        buttonForm.button.addEventListener('click', function(evt) {
            console.log("textInput Check");
            if(!textInput.isValid){
                buttonForm.badInputCB(textInput);
                evt.preventDefault();
                return false;
            }
        });
    }, this);

    //Open link in new tab when user clicks the button
    buttonForm.button.addEventListener('click', function (evt) {
        if(!buttonForm.activeErrors){
            window.open(buttonForm.link,'_blank');
        }
    });
}

//Input fields
var username = createTextSaveForm(default_username_text, "GitHub username", isValidGithubUsername);
var usernameDiv = document.getElementById("github-username-wrap");
usernameDiv.insertBefore(username, usernameDiv.firstChild);

var permalink = createTextSaveForm(default_permalink_text, "Article permalink");
var permalinkDiv = document.getElementById("github-permalink-wrap");
permalinkDiv.insertBefore(permalink, permalinkDiv.firstChild);

//Link buttons
var compareButton = createButtonForm("Click here to compare", "https://github.com/", username, "/RegenCo-op/compare/master...RegenCo-op:master");
var githubPull = document.getElementById("github-pull");
githubPull.insertBefore(compareButton, githubPull.firstChild);

var forkButton = createButtonForm("Click here to go to your fork", "https://github.com/", username, "/RegenCo-op");
var githubFork = document.getElementById("github-fork");
githubFork.insertBefore(forkButton, githubFork.firstChild);

var layoutButton = createButtonForm("Click here to edit the layout", "https://github.com/", username, "/RegenCo-op/edit/", permalink, "/docs/_data/article_layout.yml");
var githubLayout = document.getElementById("github-layout");
githubLayout.insertBefore(layoutButton, githubLayout.firstChild);

var imagesButton = createButtonForm("Click here to upload images", "https://github.com/", username, "/RegenCo-op/upload/", permalink, "/docs/images");
var githubImages = document.getElementById("github-images");
githubImages.insertBefore(imagesButton, githubImages.firstChild);

var articlesButton = createButtonForm("Click here to upload your article", "https://github.com/", username, "/RegenCo-op/upload/", permalink, "/docs/_articles");
var githubArticles = document.getElementById("github-articles");
githubArticles.insertBefore(articlesButton, githubArticles.firstChild);

var proposeButton = createButtonForm("Click here to propose your article!", "https://github.com/RegenCo-op/RegenCo-op/compare/master...", username, ":", permalink, "?expand=1");
var githubPropose = document.getElementById("github-propose");
githubPropose.insertBefore(proposeButton, githubPropose.firstChild);
