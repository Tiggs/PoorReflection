var isActive = true;
var magicMirror = angular.module('magicMirror', []);
magicMirror.controller('mainController', ['$scope', '$http', '$location', '$interval', function($scope, $http, $location, $interval) {
    var motionEnabled = false;
    var oldTime = null;

    $scope.$watch('motionEnabled', function() {
        //console.log(motionEnabled);
    });

    var clock = function() {
        $scope.clock = Date.now();
    }
    clock();
    $interval(clock, 1000);

    var weather = function() {
        $http.get('/api/weather')
            .success(function(data) {
                $scope.weatherCurrentIcon = data.currently.icon;
                $scope.weatherTemperature = data.currently.temperature.toFixed(0);
                $scope.weatherStatus = data.currently.summary;
                $scope.weatherWindSpeed = data.currently.windSpeed;
                $scope.weatherTodaySummary = data.hourly.summary;
            }).error(function(err) {
                console.log(err);
            });
    }

    weather();
    $interval(weather, 300000);

    var motion = function() {
        $http.get('/api/pir')
            .success(function(data) {
                if (data === '1') {
                    motionEnabled = true;
                    $('.container').fadeIn();
                } else {
                    motionEnabled = false;
                    $('.container').fadeOut();
                }
            }).error(function(err) {
                // don't do anything right now, pir probably isn't installed
            });
    }
    /*
    motion();
    $interval(motion, 1000);
    */

}]);
