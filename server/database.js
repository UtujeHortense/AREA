var server_module = require('./server')
const app = server_module.app
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { response } = require('express');
const fetch = require('node-fetch');

const connection = mysql.createPool({
    host: 'area.mysql.database.azure.com',
    user: 'Hortense',
    password: 'Batman123!',
    database: 'area'
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

//test complete this request works
app.get('/db/getUsers', function (req, res) {
    connection.getConnection(function (err, connection) {
        connection.query('SELECT * FROM users', function (error, results, fields) {
            if (error) {
                console.log(error)
                throw error;
            }
            res.send(results)
            console.log('Users sent')
        });
    });
});

app.post('/db/getUser', function (req, res) {
    connection.getConnection(function (err, connection) {
        var username = req.body.UserName
        var sql = `SELECT * FROM users WHERE userName = "${username}"`;
        connection.query(sql, function (error, results, fields) {
            if (error) {
                console.log(error)
                throw error;
            }
            res.send(results)
            console.log('User sent')
        });
    });
});
// test complete this request works
app.post('/db/addUser', function (req, res) {
    connection.getConnection(function (err, connection) {
        var username = req.body.UserName
        var userpass = req.body.UserPassword
        var sql = `SELECT * FROM users WHERE userName = "${username}"`;
        connection.query(sql, function (error, results, fields) {
            if (err) throw err;
            if (results.length == 0) {
                var sql = `INSERT INTO users(userName,userPassword) VALUES ('${username}', '${userpass}')`;
                connection.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("1 record inserted");
                    res.send(result)
                });
            }
            else {
                res.send(JSON.stringify(error))
            }
        });
       
    });
});

app.post('/db/load/discord', function (req, res) {
    connection.getConnection(function (err, connection) {
        var payload = {
            token: req.body.token,
            type: req.body.type,
            webhookUrl: req.body.webhookUrl
        }
        var username= req.body.username
        var sql = `UPDATE users SET discord = '${JSON.stringify(payload)}' WHERE userName = '${username}'`
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            res.send(result)
        });
    });
});
app.post('/db/unload/discord', function (req, res) {
    connection.getConnection(function (err, connection) {
        var username = req.body.UserName
        connection.query(`SELECT discord FROM users WHERE userName = '${username}'`, function (error, results, fields) {
            if (error) {
                console.log(error)
                throw error;
            }
            res.send(results)
            console.log('Data sent')
        });
    });
});

app.post('/db/load/twitter', function (req, res) {
    connection.getConnection(function (err, connection) {
        var payload = {
            token: req.body.token,
            type: req.body.type,
            refresh_token: req.body.refresh_token,
            timestamp: req.body.timestamp,
        }
        var username= req.body.username
        var sql = `UPDATE users SET twitter = '${JSON.stringify(payload)}' WHERE userName = '${username}'`
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            res.send(result)
        });
    });
});
app.post('/db/unload/twitter', function (req, res) {
    connection.getConnection(function (err, connection) {
        var username = req.body.UserName
        connection.query(`SELECT twitter FROM users WHERE userName = '${username}'`, function (error, results, fields) {
            if (error) {
                console.log(error)
                throw error;
            }
            res.send(results)
            console.log('Data sent')
        });
    });
});

app.post('/db/load/github', function (req, res) {
    connection.getConnection(function (err, connection) {
        var payload = {
            token: req.body.token,
            type: req.body.type,
        }
        var username= req.body.username
        var sql = `UPDATE users SET github = '${JSON.stringify(payload)}' WHERE userName = '${username}'`
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            res.send(result)
        });
    });
});
app.post('/db/unload/github', function (req, res) {
    connection.getConnection(function (err, connection) {
        var username = req.body.UserName
        connection.query(`SELECT github FROM users WHERE userName = '${username}'`, function (error, results, fields) {
            if (error) {
                console.log(error)
                throw error;
            }
            res.send(results)
            console.log('Data sent')
        });
    });
});

app.post('/db/load/spotify', function (req, res) {
    connection.getConnection(function (err, connection) {
        var payload = {
            token: req.body.token,
            type: req.body.type,
        }
        var username= req.body.username
        var sql = `UPDATE users SET spotify = '${JSON.stringify(payload)}' WHERE userName = '${username}'`
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            res.send(result)
        });
    });
});
app.post('/db/unload/spotify', function (req, res) {
    connection.getConnection(function (err, connection) {
        var username = req.body.UserName
        connection.query(`SELECT spotify FROM users WHERE userName = '${username}'`, function (error, results, fields) {
            if (error) {
                console.log(error)
                throw error;
            }
            res.send(results)
            console.log('Data sent')
        });
    });
});

app.post('/db/save/area', function (req, res) {
    connection.getConnection(function (err, connection) {
        fetch('http://localhost:8080/db/get/area', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        }).then(response => response.json())
        .then(data => {
            var obj = JSON.parse(data[0].AREA)
            var payload = {
                action: req.body.action,
                reaction: req.body.reaction,
            }
            obj.push(payload)
            var username= req.body.username
            if (!username) {
                username = req.body.username
            }
            var sql = `UPDATE users SET AREA = '${JSON.stringify(obj)}' WHERE userName = '${username}'`
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
                res.send(result)
            });
        });
    })
});

app.post('/db/get/area', function (req, res) {
    connection.getConnection(function (err, connection) {
        var username = req.body.UserName
        if (!username) {
            username = req.body.username
        }
        connection.query(`SELECT AREA FROM users WHERE userName = '${username}'`, function (error, results, fields) {
            if (error) {
                console.log(error)
                throw error;
            }
            res.send(results)
            console.log('Data sent')
        });
    });
});