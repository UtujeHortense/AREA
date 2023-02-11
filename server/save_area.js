const fetch = require('node-fetch');

function save_area(payload) {
    fetch('http://localhost:8080/db/save/area', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
}

module.exports = {save_area}
