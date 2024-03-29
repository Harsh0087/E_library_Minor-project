'use strict';

let users;
let jBook;
let books;


// getting login data from server
let req = new XMLHttpRequest();

req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
        users = req.responseText;
    }
};

req.open("GET", "https://api.jsonbin.io/v3/b/64030be9ace6f33a22e92074?meta=false ", true);
req.setRequestHeader("X-Access-Key", "$2b$10$vVrdTC03qN6B66LyKf/0J.yZGnHCjlof.xcPgr7nNPgwKL4Z5AevK");
req.send();



// getting books data from database\
let reqe = new XMLHttpRequest();
reqe.onreadystatechange = () => {
    if (reqe.readyState == XMLHttpRequest.DONE) {
        jBook = reqe.responseText;
    }
};

reqe.open("GET", "https://api.jsonbin.io/v3/b/64081c59c0e7653a058439f8?meta=false ", true);
reqe.setRequestHeader("X-Access-Key", "$2b$10$vVrdTC03qN6B66LyKf/0J.yZGnHCjlof.xcPgr7nNPgwKL4Z5AevK");
reqe.send();




setTimeout(function () {
    books = JSON.parse(jBook);
    users =JSON.parse(users);
}, 5000);






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
        if (type === 'success') {
            boldText = 'Success';
        }
        else {
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

userForm.addEventListener('submit', function (e) {
    const className = document.getElementById('class').value;
    const name = document.getElementById('userName').value;
    const passwd = document.getElementById('passwd').value;

    const newUser = {
        id: users.admin.users + 1,
        name: name,
        class: className,
        passwd: passwd,
    };


    users.users.push(newUser);
    users.admin.users++;

    // uploading new user data on database

    fetch('https://api.jsonbin.io/v3/b/64030be9ace6f33a22e92074?meta=false ', {
        method: 'PUT',
        body: JSON.stringify(users),
        headers: {
            'Content-type': 'application/json',
            "X-Access-Key": "$2b$10$yCt1TczM9drUVreBsiuKjubH1z/W5ZkloK7Aj/NQFxAbBiqWNN8OO",
        },
    })
        .then(res => res.json())
        .then(data => console.log(data))


    e.preventDefault();
});


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




// Add submit event listener to add new book
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

class DisplaySearchBook {

    deleteBook(books, indexs) {
        indexs = indexs.reverse();
        for (const index of indexs) {
            books.splice(index, 1);
        }
        return books
    }

    search(bookName, findBy) {
        document.getElementById('tableBody').innerHTML = '';
        const add = new Display().add;
        const sBa = [];
        let clonedBooks = JSON.parse(JSON.stringify(books));
        for (const [index, book] of books.entries()) {
            if (book[findBy].toLowerCase() === bookName.toLowerCase()){
                add(book);
                sBa.push(index);
            }
        }
        clonedBooks = this.deleteBook(clonedBooks, sBa);
        const sName = bookName.split(' ');

        for (const book of clonedBooks) {
            const cBook = book[findBy].split(' ');
            loop1:
            for (const name of sName) {
                loop2:
                for (const spName of cBook) {
                    if (spName.toLowerCase() === name.toLowerCase()) {
                        add(book);
                        break loop1;
                    }
                }
            }
        }

    }

}

document.getElementById('search').addEventListener('click', function () {
    const name = document.getElementById('search-txt').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    let btype = document.getElementById('btype');
    const displaySearch = new DisplaySearchBook();

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }
    else if (btype.checked) {
        type = btype.value;
    }
    displaySearch.search(name, type);
    // console.log(name , type);
});