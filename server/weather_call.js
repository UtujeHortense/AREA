var server_module = require('./server')
const app = server_module.app
const save_area = require('./save_area.js')
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const API_KEY = '00fbfe84d89b24a097b363c3f1909314'

var last_temp = 0

async function temp_change_function(city, reaction_path, payload) {
    var tmp = await fetch(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json' 
        },
    }).then(result => result.json())
    .then(response => {
        if (response.current.temperature != last_temp) {
            last_temp = response.current.temperature
            fetch('http://localhost:8080/' + reaction_path, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
        }
    })
    .catch(console.error);
}


app.post('/weather/temp_change', async (req, res) => {
    var city = req.body.city
    var reaction_path = req.body.Reaction
    var payload = {
        text: `La température à changer à ${city} pour ${last_temp} !`,
        title: req.body.title,
        reponame: req.body.reponame
    }
    if (req.body.text) {
        payload.text = req.body.text
    }
    var tmp = {
        username: req.body.UserName,
        action: 'weather/temp_change',
        reaction: req.body.Reaction,
    }
    //save_area.save_area(tmp)
    var setInt = setInterval(function() {temp_change_function(city, reaction_path, payload)}, 15000)
    res.send(JSON.stringify("status:Done"))
})

var wind_speed = 50
var int_wind = 0

async function wind_speed_function(city, reaction_path, body) {
    var payload = {
        text: `ATTENTION ! Tempête à ${city}, ${int_wind}`,
        title: body.title,
        reponame: body.reponame
    }
    if (body.text) {
        payload.text = body.text
    }
    var tmp = await fetch(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json' 
        },
    }).then(result => result.json())
    .then(response => {
        if (response.current.wind_speed > wind_speed) {
            int_wind += 1
            fetch('http://localhost:8080/' + reaction_path, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
        }
    })
    .catch(console.error);
}


app.post('/weather/wind_speed', async (req, res) => {
    var city = req.body.city
    var reaction_path = req.body.Reaction
    var tmp = {
        username: req.body.UserName,
        action: 'weather/wind_speed',
        reaction: req.body.Reaction,
    }
    //save_area.save_area(tmp)
    var setInt = setInterval(function() {wind_speed_function(city, reaction_path, req.body)}, 15000)
    res.send(JSON.stringify("status:Done"))
})

var uv_index = 5
var int_uv = 0

async function uv_index_function(city, reaction_path, body) {
    var payload = {
        text: `ATTENTION ! UV Alerte ! Mettez de la crème solaire si vous êtes à ${city}, ${int_uv}`,
        title: body.title,
        reponame: body.reponame
    }
    if (body.text) {
        payload.text = body.text
    }
    var tmp = await fetch(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json' 
        },
    }).then(result => result.json())
    .then(response => {
        if (response.current.uv_index > uv_index) {
            int_uv += 1
            fetch('http://localhost:8080/' + reaction_path, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
        }
    })
    .catch(console.error);
}


app.post('/weather/uv_index', async (req, res) => {
    var city = req.body.city
    var reaction_path = req.body.Reaction
   
    var tmp = {
        username: req.body.UserName,
        action: 'weather/uv_index',
        reaction: req.body.Reaction,
    }
    //save_area.save_area(tmp)
    var setInt = setInterval(function() {uv_index_function(city, reaction_path, req.body)}, 15000)
    res.send(JSON.stringify("status:Done"))
})

var humidity = 70
var int_hum = 0

async function humidity_function(city, reaction_path, body) {
    var payload = {
        text: `ATTENTION ! Il fait très humide à ${city}, ${int_hum}`,
        title: body.title,
        reponame: body.reponame
    }
    if (body.text) {
        payload.text = body.text
    }
    var tmp = await fetch(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json' 
        },
    }).then(result => result.json())
    .then(response => {
        if (response.current.humidity > humidity) {
            int_hum += 1
            fetch('http://localhost:8080/' + reaction_path, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
        }
    })
    .catch(console.error);
}

app.post('/weather/humidity', async (req, res) => {
    var city = req.body.city
    var reaction_path = req.body.Reaction
    var tmp = {
        username: req.body.UserName,
        action: 'weather/humidity',
        reaction: req.body.Reaction,
    }
    //save_area.save_area(tmp)
    var setInt = setInterval(function() {humidity_function(city, reaction_path, req.body)}, 15000)
    res.send(JSON.stringify("status:Done"))
})