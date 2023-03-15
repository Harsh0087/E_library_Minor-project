'use strict';
// login script
const adminP = document.getElementById('admin');
const stdP = document.getElementById('libraryForm'); 
const loginP = document.getElementById('login-p'); 
let loginD;
let users;
let jBook;



// getting data from server
let req = new XMLHttpRequest();

req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
        loginD= req.responseText;
    }
};

req.open("GET", "https://api.jsonbin.io/v3/b/64030be9ace6f33a22e92074?meta=false ", true);
req.setRequestHeader("X-Access-Key", "$2b$10$vVrdTC03qN6B66LyKf/0J.yZGnHCjlof.xcPgr7nNPgwKL4Z5AevK");
req.send();

// getting books data from database\
let reqe = new XMLHttpRequest();
reqe.onreadystatechange = () => {
    if (reqe.readyState == XMLHttpRequest.DONE) {
        jBook= reqe.responseText;
    }
};

reqe.open("GET", "https://api.jsonbin.io/v3/b/64081c59c0e7653a058439f8?meta=false ", true);
reqe.setRequestHeader("X-Access-Key", "$2b$10$vVrdTC03qN6B66LyKf/0J.yZGnHCjlof.xcPgr7nNPgwKL4Z5AevK");
reqe.send();

// displaying books
let books;
setTimeout(function () {
    books = JSON.parse(jBook);
    
    let tableBody = document.getElementById('tableBody');
for (const book of books){     
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


// login pop 
document.querySelector(".login-btn").addEventListener("click", function(){
    document.querySelector('.login-pop').classList.toggle('hidden');
});

document.querySelector(".btnnn").addEventListener("click", function(){
    document.querySelector('.login-pop').classList.toggle('hidden');
});
const hid = function(){
loginP.classList.toggle('hidden');
}

document.querySelector("#submit").addEventListener("click", function(){
    const user = document.querySelector('#user').value;
    users =JSON.parse(loginD);
    
    // console.log(uPower);
    if(users.admin.name === user){
        adminP.classList.toggle('hidden');
        hid();
    }
    else{
        adminP.classList.toggle('hidden');
        stdP.classList.toggle('hidden');
        document.getElementById('userForm').classList.toggle('hidden'); 
        hid();
    }

});












// lib script 
class Book {
    constructor(id, name, author, publisher, type) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.publisher = publisher;
        this.type = type;
    }
}

// class to display new add book
class Display {
    add(book) {
        console.log("Adding to UI");
        let tableBody = document.getElementById('tableBody');
        let uiString = `<tr>
                           
                            <td>${book.id}</td>
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.publisher}</td>
                            <td>${book.type}</td>
                        </tr>`;
        tableBody.innerHTML += uiString;
    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false
        }
        else {
            return true;
        }
    }

    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if(type==='success'){
            boldText = 'Success';
        }
        else{
            boldText = 'Error!';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 5000);
    
    }
}

// add new user function
const userForm = document.getElementById('userForm');

userForm.addEventListener('submit', function(e) {
    const className = document.getElementById('class').value;
    const name = document.getElementById('userName').value;
    const passwd = document.getElementById('passwd').value;
    
    const newUser = {
        id : users.admin.users + 1,
        name : name,
        class : className,
        passwd : passwd,
    };


    users.users.push(newUser);
    users.admin.user ++;
    
    // uploading new user data on database

    fetch('https://api.jsonbin.io/v3/b/64030be9ace6f33a22e92074?meta=false ' ,{
        method : 'PUT',
        body: JSON.stringify(users),
        headers: {
            'Content-type': 'application/json',
            "X-Access-Key": "$2b$10$yCt1TczM9drUVreBsiuKjubH1z/W5ZkloK7Aj/NQFxAbBiqWNN8OO",
        },
    })
    .then(res=> res.json())
    .then(data => console.log(data))
    

    e.preventDefault();
});



// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('YOu have submitted library form');
    let id = document.getElementById('bookID').value;
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let publisher = document.getElementById('bookPublisher').value;
    let type = document.getElementById('bookType').value;


    let book = new Book(id, name, author, publisher, type);
    books.push(book);

    
    
    let display = new Display();
    
    if (display.validate(book)) {
        
        display.add(book);
        display.clear();

        // uploading new book to database
        let req = new XMLHttpRequest();
    
        req.onreadystatechange = () => {
            if (req.readyState == XMLHttpRequest.DONE) {
            console.log(req.responseText);
         }
        };
    
        req.open("PUT", "https://api.jsonbin.io/v3/b/64081c59c0e7653a058439f8?meta=false", true);
        req.setRequestHeader("Content-Type", "application/json");
        req.setRequestHeader("X-Access-Key", "$2b$10$yCt1TczM9drUVreBsiuKjubH1z/W5ZkloK7Aj/NQFxAbBiqWNN8OO");
        req.send(JSON.stringify(books));

        
        display.show('success', 'Your book has been successfully added')
    }
    else {
        // Show error to the user
        display.show('danger', 'Sorry you cannot add this book');
    }

    e.preventDefault();
}


// book  search function


function search(bookName, findBy ) {
    for(const book of books){
        if(book[findBy] === bookName)
            console.log(book);
    }
}