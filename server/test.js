const { response } = require('express');
const fetch = require('node-fetch');

var tokentype = "Bearer"
var accesstoken = "QEYi4Ab7d46DfBTsTnI0PEiFV0UTsg"
/*
var payload = {
    custom_status: {
        text: "...",
    }
}
fetch('https://discord.com/api/v6/users/@me/settings', {
    method: 'PATCH',
    headers: {
        authorization: `${tokentype} ${accesstoken}`,
    },
    body: JSON.stringify(payload)
}).then(result => result.json())
.then(response => {
    console.log(response)
    response.send(response)
})
.catch(console.error);*/

var payload = {
    'UserName': 'IcySquare24',
    'Reaction': 'twitter/reaction/tweet',
    'text' :  "Hello world its me for the second time"
}
console.log("here is my payload", payload)

fetch('http:/localhost:8080/twitter/action/tweet', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(response => response.json())
    .then(data => {
        console.log(data)
}).catch(console.error)
/*
var payload = {
    'text' : "IcySquare24 is my name on twitter",
}
console.log("here is my payload", payload)

fetch('http://localhost:3000/discord/dm', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(response => response.json())
    .then(data => {
        console.log(data)
}).catch(console.error)

var payload = {
    'UserName' : "Banano",
}

fetch('http:/localhost:8080/twitter/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(response => response.json())
    .then(data => {
        console.log(data)
}).catch(console.error)*/