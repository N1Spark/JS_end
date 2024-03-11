document.addEventListener('DOMContentLoaded', () => {
    window.obj = {
        "name": "User",
        "surname": "Experienced",
    };
    updateCurrentFields();
    const addFieldButton = document.getElementById("add-field-button");
    if (addFieldButton) addFieldButton.onclick = addFieldClick;

    window.users = [
        { name: "User", surname: "Experienced" },
        { name: "Admin", surname: "Networker" },
        { name: "Moder", surname: "Designer" },
    ];
    updateRegisteredUsers();
})

function updateRegisteredUsers() {
    const usersContainer = document.getElementById("registered-users");
    if (!usersContainer) throw "Element #registered-users not found";
    usersContainer.innerHTML = "";
    const ul = document.createElement("ul");
    for (let user of window.users) {
        let li = document.createElement("ul");
        // let txt = document.createTextNode(`name: ${user.name}, surname: ${user.surname}`);
        li.innerHTML = `name: <b>${user.name}</b>, surname: <b>${user.surname}</b>`
        // li.appendChild(txt);
        ul.appendChild(li);
    }
    usersContainer.appendChild(ul);
}

function updateCurrentFields() {
    console.log(window.obj);
    const currentFields = document.getElementById("current-fields");
    if (!currentFields) throw "Element #curcurrent-fields not found";
    currentFields.innerHTML = "";
    for (let key in window.obj) {
        currentFields.innerHTML += `${key}: ${window.obj[key]} <button data-key="${key}">X</button> <br/>`;
    }
    processDeleteButtons();
}

function processDeleteButtons() {
    const buttons = document.querySelectorAll('button[data-key]');
    for (let button of buttons) {
        button.onclick = deleteButtonClick;
    }
}

function deleteButtonClick(e) {
    const key = e.target.getAttribute("data-key");
    delete window.obj[key];
    updateCurrentFields();
}

function addFieldClick() {
    const newFieldName = document.getElementById("add-field-name");
    if (!newFieldName) throw "Element #add-field-name not found";
    const newFieldValue = document.getElementById("add-field-value");
    if (!newFieldValue) throw "Element #add-field-value not found";
    const userName = newFieldName.value;
    const userValue = newFieldValue.value;
    if (!userName) {
        alert("Введите name");
        return;
    }
    if (!userValue) {
        alert("Введите value");
        return;
    }
    for (let key in window.obj) {
        if (userName == `${key}`) {
            alert("В объекте есть поле " + `${key}` + ", со значением: " + `${window.obj[key]}`);
            return;
        }
        if (userValue == `${window.obj[key]}`) {
            alert("В объекте есть поле с таким значением " + `${window.obj[key]}` + ": " + `${key}`);
            return;
        }
    }
    window.obj[newFieldName.value] = newFieldValue.value;
    updateCurrentFields();
}