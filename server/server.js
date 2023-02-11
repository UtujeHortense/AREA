'use strict';
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const open = require('open')

const PORT = 8080;
const HOST = 'localhost';
//App
const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/', (req,res) => {
    res.send("Hello, server is running ...")
});
//app.listen(PORT, HOST);
app.listen(PORT, function () {
    console.log("server listening on port "+PORT+ "...");
});
console.log(`Running on http://${HOST}:${PORT}`);

//exports.app = app;
exports.app = app;