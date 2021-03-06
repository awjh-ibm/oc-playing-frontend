const path = require('path');
const express = require('express');
const app = express();
const fetch = require('fetch').fetchUrl;

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'; 

const backendPort = process.env.BACKEND_PORT || 8080;
const backendIP = process.env.BACKEND_HOST || '127.0.0.1';

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/timestamp', (req, res) => {

    console.log('CALLING', backendIP, backendPort);

    fetch(`http://${backendIP}:${backendPort}`, (error, meta, body) => {
        if (error) {
            res.status(400);
            res.send(error);
        }

        res.json(JSON.parse(body.toString()));
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Example app listening at http://${ip}:${port}`)
});
