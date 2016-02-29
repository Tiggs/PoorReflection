var magicMirror = angular.module('magicMirror', []);
var Forecast = require('forecast.io');

function mainController($scope, $http) {
    $scope.formData = {};

    $scope.getWeather = function() {
        forecast = new Forecast({ APIKey: process.env.FORECAST_API_KEY });        

    };
}
