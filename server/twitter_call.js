var server_module = require('./server')
const app = server_module.app
const save_area = require('./save_area.js')
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cors = require('cors');
const open = require('open')
const { url } = require('inspector');
const { URLSearchParams } = require('url');
const myurl = require('url');
const needle = require('needle');

const CLIENT_ID= 'VldBLXpmV29CdVh2bTUtSkFHZ2U6MTpjaQ';
const CLIENT_SECRET = 'O0klY2BrGjq-BXHDHlH59RQvCbWCgTNsQSGw83YxEGZh7CdsqM';
const CLIENT_REDIRECT ='http://localhost:8080/twitter/oauth';
const API_ENDPOINT = 'https://api.twitter.com/2/'
const SCOPE = "tweet.read%20tweet.write%20users.read%20follows.read%20follows.write%20offline.access"

var username = ""
var accesstoken = ""
var tokentype = "bearer"

var app_only_token = "AAAAAAAAAAAAAAAAAAAAANTkZgEAAAAAQrlVW5Nip%2FgUi5QE%2FK2cSWCZlak%3Deh5n46pCMpbdvjkZ2hUixw6bp2q6ngj67USIjx0ZuThNLcz8aq"
const rulesURL = "https://api.twitter.com/2/tweets/search/stream/rules"
const streamURL = "https://api.twitter.com/2/tweets/search/stream"
//var rules = [{value: ''}]
var rules = [{value: '', id: ''}]

const getcode_url = "https://twitter.com/i/oauth2/authorize?response_type=code&client_id="+CLIENT_ID+"&redirect_uri="+CLIENT_REDIRECT+"&scope="+SCOPE+"&state=state&code_challenge=challenge&code_challenge_method=plain"
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
var now = Date.now()

app.get('/twitter/oauth', (req, res) => {
    const queryObject = myurl.parse(req.url, true).query;
    code = queryObject.code
    var payload = {
        username: '',
        token: '',
        refresh_token: '',
        type: '',
        timestamp: ''
    }
    const params = new URLSearchParams();
    params.append('code', code);
    params.append('grant_type', 'authorization_code');
    params.append('client_id', CLIENT_ID);
    params.append('redirect_uri', CLIENT_REDIRECT);
    params.append('code_verifier', 'challenge');
    fetch('https://api.twitter.com/2/oauth2/token', {
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
        payload.username = username
        payload.token = accesstoken
        payload.refresh_token = data.refresh_token
        payload.type = tokentype
        payload.timestamp = Date.now()
         //load in database
        fetch ('http://localhost:8080/db/load/twitter', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
    }).catch(console.error)
    res.send(JSON.stringify("status:connected"))
});

app.post('/twitter/login', async (req, res) => {
    var after = Date.now()    
    username = req.body.UserName
    //unload from database
    var payload = {
        UserName: username
    }
    var result = await fetch ('http://localhost:8080/db/unload/twitter', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(response => response.json())
    .then(data => {
        if (data[0].twitter != null) {
            var res = JSON.parse(data[0].twitter)
            var now = Date.now()
            if ((now - res.timestamp) < 7200000) {
                 accesstoken = res.token
                 tokentype = res.type
            }
           else {
               console.log("refresh token")
           }
        }
    })
    // check if access token exist full
    console.log("connecting")
    if (accesstoken){
        res.send(JSON.stringify("status:connected"))
    }
    else {
        open(getcode_url)
        res.send(getcode_url)
    }
});

app.get('/twitter/user', (req, res) => {
    var payload = {
        user:"",
        id:""
    }
    fetch('https://api.twitter.com/2/users/me', {
        headers: {
            authorization: `${tokentype} ${accesstoken}`,
        },
    }).then(result => result.json())
    .then(response => {
        payload.user = response.data.username
        payload.id = response.data.id
        res.send(JSON.stringify(payload))
    })
    .catch(console.error);
});


app.post('/twitter/reaction/tweet', (req, res) => {
    var payload = {
        status:"",
    }
    var params = {
        'text': req.body.text
    }
    console.log("i got here")
    fetch('https://api.twitter.com/2/tweets', {
        method: 'POST',
        headers: {
            authorization: `${tokentype} ${accesstoken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }).then(result => result.json())
    .then(response => {
        payload.status = "Done tweeting"
        console.log("done tweeting")
        res.send(JSON.stringify(payload))
    })
    .catch(console.error);
});

app.post('/twitter/action/tweet', (req, res) => {
    (async () => {
        rules[0].value = 'from:'+ req.body.UserName
        let currentRules
        var tmp = {
            username: username,
            action: 'twitter/action/tweet',
            reaction: req.body.Reaction,
        }
        // save_area.save_area(tmp)
        console.log("Ran")
        try {
            currentRules = await getRules()
            await deleteRules(currentRules)
            await setRules()
    
        } catch (error) {
            console.error(error)
            process.exit(1)
        }
        streamTweets(req.body)
    })()
    res.send(JSON.stringify("status:Done"))
});

app.post('/twitter/action/mention', (req, res) => {
    (async () => {
        rules[0].value = req.body.UserName
        rules[0].id = req.body.Id
        var tmp = {
            username: username,
            action: 'twitter/action/mention',
            reaction: req.body.Reaction,
        }
        // save_area.save_area(tmp)
        let currentRules
        try {
            currentRules = await getRules()
            await deleteRules(currentRules)
            await setRules()
    
        } catch (error) {
            console.error(error)
            process.exit(1)
        }
        streamTweets(req.body)
    })()
    res.send(JSON.stringify("status:Done"))
});


//get rules
async function getRules() {
    var results = null
    const res =  await fetch(rulesURL, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${app_only_token}`,
        }
    }).then(result => result.json())
    .then(response => {
        results = response
    })
    .catch(console.error);
    return results
}

//set rules
async function setRules() {
    const data = {
        add: rules
    }
    const res = await fetch(rulesURL, {
        method: 'POST',
        headers: {
            authorization: `Bearer ${app_only_token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(result => result.json())
    .then(response => {
        console.log("set rules", response)
    })
    .catch(console.error);
}

//set rules
async function deleteRules(rules) {
    if (!Array.isArray(rules.data)) {
        return null
    }
    const ids = rules.data.map((rule) => rule.id)
    const data = {
        delete:  {
            ids: ids
        }
    }
    const res = await fetch(rulesURL, {
        method: 'POST',
        headers: {
            authorization: `Bearer ${app_only_token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(result => result.json())
    .then(response => {
        console.log("delete rules", response)
    })
    .catch(console.error);
}

function streamTweets(body) {
    console.log("reaction path ! : ", body.Reaction)
    const stream = needle.get(streamURL, {
        headers: {
            Authorization: `Bearer ${app_only_token}`,
        }
    })
    var payload = {
        text: body.text,
        title: body.title,
        reponame: body.reponame
    }
    stream.on('data', (data) => {
        try {
            const json = JSON.parse(data)
            fetch("http://localhost:8080/" + body.Reaction, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
        } catch (error) {
            
        }
    })
}