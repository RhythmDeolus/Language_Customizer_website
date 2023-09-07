const express = require('express');
let path = require('path');

let app = express();

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(process.env.PORT || 8080
    , function (err) {
        if (err) console.error("Error while starting the server.\n", err);
        console.log("Runing the server on: ", `http://127.0.0.1:${process.env.PORT || 8080}/creator`);
    })