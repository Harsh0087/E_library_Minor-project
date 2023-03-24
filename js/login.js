'use strict'
// import { users } from "/js/get-data.js";
// login script
const adminP = document.getElementById('admin');
const stdP = document.getElementById('libraryForm');
const loginP = document.getElementById('login-p');


// login pop 
document.querySelector(".login-btn").addEventListener("click", function () {
    document.querySelector('.login-pop').classList.toggle('hidden');
});

document.querySelector(".btnnn").addEventListener("click", function () {
    document.querySelector('.login-pop').classList.toggle('hidden');
});
const hid = function () {
    loginP.classList.toggle('hidden');
}

document.querySelector("#submit").addEventListener("click", function () {
    const user = document.querySelector('#user').value;

    // console.log(uPower);
    if (users.admin.name === user) {
        adminP.classList.toggle('hidden');
        hid();
    }
    else {
        adminP.classList.toggle('hidden');
        stdP.classList.toggle('hidden');
        document.getElementById('userForm').classList.toggle('hidden');
        hid();
    }

});