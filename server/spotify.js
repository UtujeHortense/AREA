var server_module = require('./server')
const app = server_module.app
var express = require('express');
var request = require('request');
var cors = require('cors');
const open = require('open');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
const { authorize } = require('passport');
const { response, json } = require('express');
const fetch = require('node-fetch');

var client_id = '869cea92fee0469eb867509986b412a1';
var client_secret = 'f92c615ae17545c5af3b9ca757484740';
var redirect_uri = 'http://localhost:8080/spotify/callback';
var access_token = ''
var device = ""
var scope = 'user-read-private user-read-email playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public streaming app-remote-control user-read-playback-state';
var username = ""

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var state = generateRandomString(16);
const getcode_url = "https://accounts.spotify.com/authorize?response_type=code&client_id=" + client_id + "&scope=user-read-private%20user-read-email%20playlist-modify-private%20playlist-read-collaborative%20playlist-read-private%20playlist-modify-public%20streaming%20app-remote-control%20user-read-playback-state&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fspotify%2Fcallback&state=" + state
var stateKey = 'spotify_auth_state';

app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());

app.post('/spotify/login', function(req, res) {
  
  username = req.body.UserName
  res.cookie(stateKey, state);

  var payload = {
    UserName: username
  }
  fetch ('http://localhost:8080/db/unload/spotify', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
  }).then(response => response.json())
  .then(data => {
      if (data[0].spotify != null) {
          var res = JSON.parse(data[0].spotify)
          var now = Date.now()
          if ((now - res.timestamp) < 3600) {
               access_token = res.token
               tokentype = res.type
          }
         else {
             console.log("refresh token")
         }
      }
  })
  // check if access token exist full
  console.log("connecting")
  if (access_token){
      res.send(JSON.stringify("status:connected"))
  }
  else {
    open(getcode_url)
    res.send(getcode_url)
  }
});

app.get('/spotify/callback', function(req, res) {
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  var payload = {
    username: '',
    token: '',
    type: '',
    timestamp: ''
}

  res.clearCookie(stateKey);
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      access_token = body.access_token;
      var token_type = body.token_type
      payload.username = username
      payload.token = access_token
      payload.type = token_type
      payload.timestamp = Date.now()
      fetch ('http://localhost:8080/db/load/spotify', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
      .catch(console.error)
      console.log(access_token);
      fetch('https://api.spotify.com/v1/me/player/devices',{
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(response => response.json())
      .then(data => {
        console.log(data)
        device = data.devices[0].id
      })
      .catch(console.error)
      }
    });
  res.send(JSON.stringify("status:connected"))
});

app.post('/spotify/action/create_playlist', async(req, res) => {
  
  var user_id = ""

  var user_data = await fetch('http://localhost:8080/spotify/user',{
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
  .then(data => {
    user_id = data.id
  }).catch(console.error)
  
  
  var name = req.body.text
  var payload = {"name":name,  "description": "New playlist description",
  "public": false}
  var new_playlist = await fetch('https://api.spotify.com/v1/users/'+ user_id +'/playlists',{
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).then(response => response.json())
  .then(data => {console.log(data)})
  .catch(console.error)
  res.send(JSON.stringify("status: playlist_create"))
});

app.get('/spotify/action/play', async (req, res)=> {
  
  var play = await fetch('https://api.spotify.com/v1/me/player/play?device_id=' + device,{
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .catch(console.error)
  res.send(JSON.stringify("status: musique playing"))
})

app.get('/spotify/action/pause', (req, res)=> {
  
  fetch('https://api.spotify.com/v1/me/player/pause?device_id=' + device,{
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .catch(console.error)
  res.send(JSON.stringify("status: musique pause"))
})

app.get('/spotify/action/next', (req, res)=> {
  
  fetch('https://api.spotify.com/v1/me/player/next?device_id=' + device,{
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .catch(console.error)
  res.send(JSON.stringify("status: musique skipped"))
})

app.get('/spotify/action/previous', (req, res)=> {
  
  fetch('https://api.spotify.com/v1/me/player/previous?device_id=' + device,{
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .catch(console.error)
  res.send(JSON.stringify("status: musique last track"))
})

app.get('/spotify/action/playlist_user', async(req, res)=> {
  var user_id = ""

  var user_data = await fetch('http://localhost:8080/spotify/user',{
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
  .then(data => {
    user_id = data.id 
  }).catch(console.error)

  var playlist_data = await fetch('https://api.spotify.com/v1/users/' + user_id + '/playlists',{
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
  .then(data => {
    console.log(data)
  })
  .catch(console.error)
  res.send('connected')
})

app.get('/spotify/user', async(req, res) => {
  var payload = {"id": "", "user": ""}

  var catch_info = await fetch('https://api.spotify.com/v1/me',{
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
  .then(data => {
    payload.id = data.id
    payload.user = data.display_name
  })
  .catch(console.error)
  res.send(JSON.stringify(payload))

});