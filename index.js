const path = require('path');
const express = require('express');
const app = express();
const fetch = require('fetch').fetchUrl;

console.log()

var port = process.env.OPENSHIFT_NODEJS_PORT || 8081;
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'; 

const backendPort = process.env.BACKEND_PORT || 8080;
const backendIP = process.env.BACKEND_HOST || '127.0.0.1';

app.get('/api/timestamp', (req, res) => {
    fetch(`http://${backendIP}:${backendPort}`, (error, meta, body) => {
        if (error) {
            res.status(400);
            res.send(error);
        }

        res.json(JSON.parse(body.toString()));
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, ip, () => {
    console.log(`Example app listening at http://${ip}:${port}`)
});
