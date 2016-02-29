require('env.js');
var express = require('express');
var app = express();

app.use(express.static('app'));
app.get('*', function(req, res) {
    res.sendFile('index.html');
});

app.get('/api/weather', function(req, res) {

});

app.listen(8080);

console.log('magic mirror active');
