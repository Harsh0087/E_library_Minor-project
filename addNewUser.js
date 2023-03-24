'use strict'
 import { users } from "/get-data.js";
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