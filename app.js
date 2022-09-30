/*
    * In this assignment I have made a list-application where you can add, delete and edit your hobbies. 
    * I have commented on each line of code to explain what it does and what the purpose of it is.
    * I have also sepcified where I have fulfilled the task criterias (Task 1+2).
    * There will be a seperate PDF file where I will go more in depth how I solved the task, and how I have implemented the learning materials to the code. 
*/

// ---------- GLOBAL VARIABLES: SELECTORS ----------

//Global variables
const addButton = document.querySelector(".addButton");
const inputSection = document.querySelector("#input-section");
const input = document.querySelector(".input");
const okButton = document.querySelector("#okButton");
const ok2Button = document.querySelector("#ok2Button");
const escButton = document.querySelector("#escButton");
const hobbyList = document.querySelector(".hobby-list");
const listP = document.querySelector(".listP");


// ---------- EVENT LISTENERS ----------

//Event Listeners that runs a function when clicked
addButton.addEventListener('click', formVisible)
okButton.addEventListener('click', newHobby);
escButton.addEventListener('click', formHidden);
hobbyList.addEventListener('click', EditDelete);


// ---------- FUNCTIONS ----------

//Function: Make the form-section visible
//Task 2.1
function formVisible() {
    //Make the input-section visible
    inputSection.style.visibility = 'visible';
    //Make the input in focus
    input.focus();
    //Make the OK button (ok-add hobby) visible
    okButton.style.visibility = 'visible';
    //Make the second OK button (ok-edit) hidden
    ok2Button.style.visibility = 'hidden';
}

//Function: Make the form-section and OK button 1 & 2, hidden
function formHidden() {
    //Make the input-section hidden
    inputSection.style.visibility = 'hidden';
    //Make OK2-button hidden
    ok2Button.style.visibility = 'hidden';
    //Make OK-button hidden
    okButton.style.visibility = 'hidden';

}

//Calls the 'formHidden' function, so it's hidden when you load the page
formHidden();


//Function: Make new list/hobby item
function newHobby(event) {
    //Prevent from auto submitting
    event.preventDefault();

    //Check if there is input value
    //Task 2.1a+b
    if (!input.value) { //If the is no value, alert.
        alert("Please type in a hobby!");
        return; //Return back
    }
    else if (window.confirm("Are you sure you want to add hobby?") == false) { //If user cancels, return.
        return; 
    }

    //Create div, where each list-item will go into
    const listItemDiv = document.createElement('div');
    listItemDiv.classList.add('listItemDiv');

    //Create list item (li)
    const listItem = document.createElement('li');
    listItem.classList.add('listItem');

    //Create a <p> where the input value will go into. This will make it easier to edit the item
    const listP = document.createElement('p');
    listP.classList.add('listP');
    listP.innerText = input.value; //Make the he value of 'p',input the value

    //Append <p> item to the list item
    listItem.appendChild(listP);

    //Append list item to the list div
    listItemDiv.appendChild(listItem);

    //Create Edit button
    const editButton = document.createElement('button');
    editButton.classList.add('editButton'); //Sets the value of the class attribute of the element
    editButton.innerText = "Edit"; //Adding the button input

    //Create a 'pipe' between buttons, this is just to make the list more appealing
    const pipe = document.createElement('p');
    pipe.classList.add('pipe'); //Sets the value of the class attribute of the element 
    pipe.innerText = "|"; //Adding the pipe

    //Create Delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteButton'); //Sets the value of the class attribute of the element
    deleteButton.innerText = "Del"; //Adding the button input

    //Append edit-button, pipe, and delete-button to the list div
    listItemDiv.appendChild(editButton);
    listItemDiv.appendChild(pipe);
    listItemDiv.appendChild(deleteButton);

    //Append the list-div to the OL list
    hobbyList.appendChild(listItemDiv);

    //Clear input value, so what you wrote in input will be erased
    input.value = "";

    //Calls the 'formHidden' function, that hides the input section
    formHidden();
}


//Function: Edit- and Delete buttons
function EditDelete(e) {

    //Variable that checks what the user has targeted
    const item = e.target; 

    //Variable that chooses the items parent element (list div)
    const hobby = item.parentElement;

    //If statement that checks if the delete- or edit button is pressed
    //Task 1.1
    if (item.classList[0] === 'deleteButton') { //If delete button is pressed, do the following:
        //Task 1.1a
        if (window.confirm("Are you sure you want to remove hobby?") == true) { //If user confirms, proceed. 
            hobby.remove(); //Removes selected list item
        }
        else { //If user cancels, return.
            return;
        }
    }

    //Task 1.2
    else if (item.classList[0] === 'editButton') { //If edit button is pressed, do the following:
        formVisible(); //Make input section visible
        input.focus(); //Put the input field in focus
        okButton.style.visibility = 'hidden'; //Hide the original OK-button
        ok2Button.style.visibility = 'visible'; //Show the second OK-button (OK2, that are going to change the list-item)

        //Remove event listener to okButton, so that the user cannot press the 'enter' key, and use the original OK-button
        okButton.removeEventListener('click', newHobby);

        //Add onclick function to the OK2-button.
        ok2Button.onclick = function() {

            //Checks if user wants to edit hobby
            //Task 1.2a+b
            if (window.confirm("Are you sure you want to edit hobby?") == false) { //If user cancels, return.
                return;
            }

            //Retrieve the listItem from the targetet element, and put the 'innerHTML' to the input value.
            hobby.getElementsByClassName("listItem")[0].innerHTML = input.value;

            //Clear input value, so what you wrote in input will be erased
            input.value = "";

            //Calls the function that will hide the form-section
            formHidden();
        }
    }
}