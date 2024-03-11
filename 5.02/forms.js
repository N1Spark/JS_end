document.onsubmit = function (e) {
    e.preventDefault();

    //#region username

    const userNameInput = e.target.querySelector('[name="user-name"]');
    if (!userNameInput) {
        alert('В форме не найден элемент [name="user-name"]');
        return;
    }
    const userName = userNameInput.value.trim();
    let data = { inputElement: userNameInput, message: "Проверено", isError: false };
    if (userName.length == 0) {
        data.message = "Поле не должно быть пустым";
        data.isError = true;
    }
    else if (userName.length == 1) {
        data.message = "Имя слишком короткое";
        data.isError = true;
    }
    else {
        let regEn = /^[A-Z][a-z]+(\s+[A-Z][a-z]+)*$/;
        let regRu = /^[А-Я][а-я']+(\s+[А-Я][а-я']+)*$/;
        if (!regEn.test(userName) && !regRu.test(userName)) {
            data.message = "Имя должно начинаться с заглавной буквы";
            data.isError = true;
        }
    }
    setHelperMessage(data);

    //#endregion

    //#region Password
    const userPassInput = e.target.querySelector('[name="user-password"]');
    if (!userNameInput) {
        alert('В форме не найден элемент [name="user-password"]');
        return;
    }
    const userPass = userPassInput.value.trim();
    data = { inputElement: userPassInput, message: "Проверено", isError: false };
    if (userPass.length == 0) {
        data.message = "Поле не должно быть пустым";
        data.isError = true;
    }
    else {
        let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{4,}$/;
        if (!reg.test(userPass)) {
            data.message = "Пароль должен содержать: цифру, маленькую букву, большую букву, спец-символ";
            data.isError = true;
        }
    }
    setHelperMessage(data);

    //#endregion

    //#region Repeat password
    const userRepeatInput = e.target.querySelector('[name="user-repeat"]');
    if (!userRepeatInput) {
        alert('В форме не найден элемент [name="user-repeat"]');
        return;
    }
    const userRepeat = userRepeatInput.value.trim();
    data = { inputElement: userRepeatInput, message: "Пароли одинаковые", isError: false };
    if (userRepeat.length == 0) {
        data.message = "Поле не должно быть пустым";
        data.isError = true;
    }
    else if (userRepeat != userPass) {
        data.message = "Пароли не совпадают";
        data.isError = true;
    }
    setHelperMessage(data);
    //#endregion


    //#region Phone
    const userPhoneInput = e.target.querySelector('[name="user-phone"]');
    if (!userPhoneInput) {
        alert('В форме не найден элемент [name="user-phone"],');
        return;
    }
    let userPhone = userPhoneInput.value.trim();
    data = { inputElement: userPhoneInput, message: "Проверено", isError: false };
    if (userPhone.length == 0) {
        data.message = "Поле не должно быть пустым";
        data.isError = true;
    }
    else {
        //let reg = /^\d{6,10}$/;
        //let reg = /^\d([-\s]?\d){5,9}$/;
        userPhone = userPhone.replace(/\D+/g, "");
        let reg = /^\d{6,10}$/;
        if (!reg.test(userPhone)) {
            data.message = "Введен неверный номер телефона";
            data.isError = true;
        }
        else {
            userPhoneInput.value = userPhone;
        }
    }
    setHelperMessage(data);
    //#endregion

    //#region Email
    const userEmailInput = e.target.querySelector('[name="user-email"]');
    if (!userEmailInput) {
        alert('В форме не найден элемент [name="user-email"]');
        return;
    }
    const userEmail = userEmailInput.value.trim();
    data = { inputElement: userEmailInput, message: "Проверено", isError: false };
    if (userEmail.length == 0) {
        data.message = "Поле не должно быть пустым";
        data.isError = true;
    }
    setHelperMessage(data);
    //#endregion

    //#region Birth
    const userBirthInput = e.target.querySelector('[name="user-birthdate"]');
    if (!userBirthInput) {
        alert('В форме не найден элемент [name="user-birthdate"]');
        return;
    }
    const userBirth = userBirthInput.value.trim();
    data = { inputElement: userBirthInput, message: "Проверено", isError: false };
    if (userBirth.length == 0) {
        data.message = "Поле не должно быть пустым";
        data.isError = true;
    }
    setHelperMessage(data);
    //#endregion
    console.log(userName + " : " + userPass);
}

function setHelperMessage({ inputElement, message, isError }) {
    const helper = inputElement.parentNode.querySelector(".helper-text");
    if (isError) {
        helper.setAttribute("data-error", message)
        inputElement.classList.remove("valid");
        inputElement.classList.remove("validate");
        inputElement.classList.add("invalid");
    }
    else {
        helper.setAttribute("data-success", message)
        inputElement.classList.add("valid");
        inputElement.classList.remove("validate");
        inputElement.classList.remove("invalid");
    }
}