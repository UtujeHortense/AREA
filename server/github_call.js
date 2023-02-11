var server_module = require('./server')
const app = server_module.app
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios')

//constant

const CLIENT_ID = 'a236dce68e64a20d71f7';
const CLIENT_SECRET = '18eabc0b7c82f85e9a67c43c97c19fe20c9872da';
const APP_HOMEPAGE = 'http://localhost:8080/github';
const APP_CALLBACK = 'http://localhost:8080/github/oauth'

const getcode_url = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user%20repo%20repo:status%20notifications`;
var accesstoken = ""
var tokentype = ""
var code = ""
var username = ""
var repo_owner = ""
var repo_list = []
const open = require('open')


app.post('/github/login', async (req, res) => {
    username = req.body.UserName
    //unload from database
    var payload = {
        UserName: username
    }
    console.log("connecting")
    var result = await fetch('http://localhost:8080/db/unload/github', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(response => response.json())
    .then(data => {
        if (data[0].github != null) {
            var res = JSON.parse(data[0].github)
            accesstoken = res.token
            tokentype = res.type
        }
    })
    if (accesstoken){
        res.send(JSON.stringify("status:connected"))
    }
    else {
        open(getcode_url)
        res.send(getcode_url)
    }
})

app.get('/github/oauth', async (req, res) => {
    // The req.query object has the query params that were sent to this route.
    const requestToken = req.query.code
    var payload = {
        username: '',
        token: '',
        type: '',
    }
    var payload1 = {
        code: requestToken,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
    }
    var tmp = await fetch(`https://github.com/login/oauth/access_token`, {
        // Set the content type header, so that we get the response in JSON
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload1)
    }).then(response => response.json())
    .then((data) => {
        //save to database
        accesstoken = data.access_token
        payload.token = accesstoken
        payload.type = 'token'
        payload.username = username
        fetch('http://localhost:8080/db/load/github', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(response => console.log("Loaded"))
    })
    var users = await fetch ('http://localhost:8080/github/user', {
        headers: {
            'Accept': 'application/json',
        },
    }).then(response => console.log("Got user"))
    res.send(JSON.stringify("status:connected"))
})

app.get('/github/user', function(req, res) {
    var payload = {
        user: "",
        id: ""
    }
    fetch('https://api.github.com/user', {
        headers: {
            Authorization: 'token ' + accesstoken
        }
    }).then(response => response.json())
    .then((data) => {
        payload.user = data.login
        payload.id = data.id
        repo_owner = data.login
        res.send(JSON.stringify(payload))
    }).catch(console.error)
});

app.post('/github/issue', (req, res) => {
    var reponame = req.body.reponame
    var payload = {
        "title": req.body.title,
        "body" : req.body.text
    }
    fetch('https://api.github.com/repos/'+repo_owner+'/'+reponame+'/issues', {
        method: 'post',
        headers: {
            Authorization: 'token ' + accesstoken,
            'accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then((response) => response.json())
    .then(data => {
        console.log("Done")
        res.send(JSON.stringify("status: done"))
    })
    .catch(console.error);
})

app.get("/github/get/repos", (req, res) => {
    fetch(`https://api.github.com/users/${repo_owner}/repos`, {
        // Set the content type header, so that we get the response in JSON
        headers: {
            Authorization: 'token ' + accesstoken,
            accept: 'application/json'
        },
    }).then(response => response.json())
    .then(data => {
        data.forEach(element => {
            repo_list.push(element.name)
        });
        res.send(JSON.stringify("repos:"+repo_list))
    }).catch(console.error);
})
