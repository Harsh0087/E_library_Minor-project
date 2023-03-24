'use strict';
import {  books } from "/get-data.js";
import {} from '/login.js';
import {} from '/addNewUser.js';
import {} from "/bookDisplay.js";
import {} from '/addNewBook.js';
import {} from '/search.js';





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








