var server_module = require('./server')
const app = server_module.app
const save_area = require('./save_area.js')
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

var int_tmp = 0

async function timer_done(reaction_path, body) {
    var payload = {
        text: body.text + int_tmp,
        title: body.title,
        reponame: body.reponame
    }
    int_tmp += 1
    var tmp = await fetch('http://localhost:8080/' + reaction_path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
}

app.post('/timer/every_x_seconds', async (req, res) => {
    var delay = parseInt(req.body.delay, 10)
    var reaction_path = req.body.Reaction
    var tmp = {
        username: req.body.UserName,
        action: 'timer/every_x_seconds',
        reaction: req.body.Reaction,
    }
    save_area.save_area(tmp)
    var setInt = setInterval(function() {timer_done( reaction_path, req.body)}, delay * 1000)
})

app.post('/timer/on_date', async (req, res) => {
    var date = new Date().getTime()
    var date_to = new Date(req.body.date).getTime()
    var delay = parseInt(req.body.delay, 10)
    var reaction_path = req.body.Reaction
    var tmp = {
        username: req.body.UserName,
        action: 'timer/every_x_seconds',
        reaction: req.body.Reaction,
    }
    save_area.save_area(tmp)
    var setInt = setInterval(function() {timer_done( reaction_path, req.body.text)}, date_to - date)
})

