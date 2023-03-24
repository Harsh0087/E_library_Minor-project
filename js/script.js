'use strict';
// import {  books } from "../js/get-data.js";
// import {} from '/js/login.js';
// import {} from '/js/addNewUser.js';
// import {} from "../../js/bookDisplay.js";
// import {} from '/js/addNewBook.js';
// import {} from '/js/search.js';





// displaying books

setTimeout(function () {
    

    let tableBody = document.getElementById('tableBody');
    for (const book of books) {
        const uiString = `<tr>
    <td>${book.id}</td>
    <td>${book.name}</td>
    <td>${book.author}</td>
    <td>${book.publisher}</td>
    <td>${book.type}</td>
    </tr>`;
        tableBody.innerHTML += uiString;
    }
}, 5000);








