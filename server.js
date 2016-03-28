var express = require('express');
var Forecast = require('forecast.io');
var util = require('util');
var fs = require('fs');
var config = require('./config');
var gpio = require('pi-gpio');

//var pir = new Gpio(4, 'in', 'both');
var app = express();

app.use(express.static('app'));
app.get('/', function(req, res) {
    res.sendFile('index.html');
});

app.get('/api/weather', function(request, response) {
    var callback = function(err, data) {
        response.send(data);
    };

    var forecast = new Forecast({ APIKey: config.weatherApiKey });
    forecast.get(config.weatherLong, config.weatherLat, function(err, res, data) {
        callback(err, data);
    });

});

app.get('/api/pir', function(request, response) {
    var callback = function(err, value) {
        gpio.close(7);
        response.send(String(value));
    };
    //callback('',Math.round(Math.random()));
    gpio.open(7, "input", function(err) {
        gpio.read(7, function(err, value) {
	    //if (err) throw err;
            callback(err, value);
        });
    });
});

var server = app.listen(8080);
if (config.weatherApiKey === '') {
    server.close(function() {
        console.error("You need to set a WeatherApiKey in config.js! Subscribe to one at https://developer.forecast.io/");
    });
} else {
    console.log('magic mirror active');
}
