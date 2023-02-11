var server_module = require('./server')
const app = server_module.app
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios')

//constant

const CLIENT_ID = 'Cx7ebM4qWr2vhQ-In-lKpQ';
const CLIENT_SECRET = '4Bc8daq0WTZ0XS3nFyhnjx-zPq6egA';
const CLIENT_REDIRECT = 'http://localhost:8080/reddit/login';

const getcode_url = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=7eIEycc4vl&redirect_uri=${CLIENT_REDIRECT}&duration=temporary&scope=identity%20subscribe%20read%20mysubreddits%20account%20vote%20subscribe`
var accesstoken = ""
var tokentype = ""
var code = ""
const open = require('open')
app.use(cors());
app.use(bodyParser.json())

//routes
app.get('/reddit/oauth', (req, res) => {
    open(getcode_url)
    res.send(getcode_url)
})

app.get('/reddit/login', (req, res) => {
    const requestToken = req.query.code
    console.log("CODE " + requestToken)

    const form = new URLSearchParams({
        grant_type: "authorization_code",
        code: requestToken,
        redirect_uri: CLIENT_REDIRECT
    })
    //const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")
    console.log(form)

    if (!accesstoken) {
        axios({
            method: 'post',
            url: `https://ssl.reddit.com/api/v1/access_token`,
            // Set the content type header, so that we get the response in JSON
            headers: {
                "User-Agent": "web app",
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ` + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
            },
            body: form
        }).then((response) => {
            console.log(response)
            access_token = response.data.access_token
            console.log("TOKEN " + access_token)
            res.send(access_token)
        })
    }
});

app.get('/reddit/user', (req, res) => {
    var payload = {
        user: ""
    }
    fetch('https://reddit.com/api/v1/me', {
        headers: {
            authorization: `${tokentype} ${accesstoken}`,
        },
    }).then(result => result.json())
        .then(response => {
            const { username, discriminator } = response;
            console.log("userame and disc is : ", username, discriminator)
            payload.user = username
            res.send(JSON.stringify(payload))
        })
        .catch(console.error);
})