var server_module = require('./server')
const app = server_module.app
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cors = require('cors');
//constant

const CLIENT_ID= '932989903342534786';
const CLIENT_SECRET = 'eXKhwTUuctXgd-nzif5GwnO7nw_fsmfo';
const CLIENT_REDIRECT ='http://localhost:8080/discord/oauth';

const getcode_url = "https://discord.com/api/oauth2/authorize?client_id=932989903342534786&redirect_uri=" + CLIENT_REDIRECT + "&response_type=code&scope=identify%20email%20connections%20guilds%20guilds.join%20guilds.members.read%20gdm.join%20webhook.incoming"
var accesstoken = ''
var tokentype = ""
var code = ""
var guild_id = ""
var urlWebhook = ''
var username = ""
const open = require('open')
const { url } = require('inspector');
const { URLSearchParams } = require('url');
const myurl = require('url')
const { response, json } = require('express');
const { use } = require('passport');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

//routes
app.get('/discord/oauth', (req, res) => {
    const queryObject = myurl.parse(req.url, true).query;
    var Webhook = {}
    code = queryObject.code
    guild_id = queryObject.guild_id
    var payload = {
        username: '',
        token: '',
        type: '',
        webhookUrl: ''
    }
    const params = new URLSearchParams();
    params.append('client_id', CLIENT_ID);
    params.append('client_secret', CLIENT_SECRET);
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', CLIENT_REDIRECT);
    fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
    }).then(response => response.json())
    .then(data => {
        accesstoken = data.access_token
        tokentype = data.token_type
        Webhook = data.webhook
        urlWebhook = Webhook.url
        payload.username = username
        payload.token = accesstoken
        payload.type = tokentype
        payload.webhookUrl = urlWebhook
        //load in database
        fetch ('http://localhost:8080/db/load/discord', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
    })
    res.send(JSON.stringify("status:connected"))
})

app.get('/discord/user', (req, res) => {
    var payload = {
        user:""
    }
    fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `${tokentype} ${accesstoken}`,
        },
    }).then(result => result.json())
    .then(response => {
        const { username, discriminator } = response;
        payload.user = username
        res.send(JSON.stringify(payload))
    })
    .catch(console.error);
})

app.post('/discord/login', async (req, res) => {
    username = req.body.UserName
    //unload from database
    var payload = {
        UserName: username
    }
    console.log("connecting")
    var result = await fetch('http://localhost:8080/db/unload/discord', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(response => response.json())
    .then(data => {
        if (data[0].discord != null) {
            console.log("Unloading data")
            var res = JSON.parse(data[0].discord)
            accesstoken = res.token
            tokentype = res.type
            urlWebhook = res.webhookUrl
        }
    })
    if (accesstoken){
        res.send(JSON.stringify("status:connected"))
    }
    else {
        open(getcode_url)
        res.send(getcode_url)
    }
});

app.post('/discord/dm', (req, res) => {
    var payload = {
        username: "Area",
        avatar_url: null,
        content: req.body.text
    }
    fetch(urlWebhook, {
        method: 'POST',
        headers: {
            authorization: `${tokentype} ${accesstoken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(result => result.text())
    .then(response => {
        res.send(JSON.stringify("status:Done"))
    })
    .catch(console.error);
})

app.get('/discord/guilds', (req, res) => {
    var payload = {
        user:""
    }
    fetch('https://discord.com/api/users/@me/guilds', {
        headers: {
            authorization: `${tokentype} ${accesstoken}`,
        },
    }).then(result => result.json())
    .then(response => {
        res.send(response)
    })
    .catch(console.error);
})

app.post('/discord/status', (req, res) => {
    var payload = {
        text:"...",
    }
    fetch('https://discord.com/api/v6/users/@me/settings', {
        method: 'PATCH',
        headers: {
            authorization: `${tokentype} ${accesstoken}`,
        },
        body: JSON.stringify(payload)
    }).then(result => result.json())
    .then(response => {
        res.send(response)
    })
    .catch(console.error);
})