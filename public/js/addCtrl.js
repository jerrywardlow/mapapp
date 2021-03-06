// Create addCtrl Module and Controller. Depends on 'geolocation' module and service.
var addCtrl = angular.module('addCtrl', ['geolocation', 'gservice']);
addCtrl.controller('addCtrl', function($scope, $http, geolocation, gservice){

    //Initialize Variables
    $scope.formData = {};
    var coords = {};
    var lat = 0;
    var long = 0;

    // Set initial coordinates to center of US
    $scope.formData.latitude = 39.500;
    $scope.formData.longitude = -98.350;

    // Functions
    // Create new user based on form fields
    $scope.createUser = function() {

        var userData = {
            username: $scope.formData.username,
            gender: $scope.formData.gender,
            age: $scope.formData.age,
            favlang: $scope.formData.favlang,
            location: [$scope.formData.longitude, $scope.formData.latitude],
            htmlverified: $scope.formData.htmlverified
        };

        $http.post('/users', userData)
            .success(function (data) {

                $scope.formData.username = "";
                $scope.formData.gender = "";
                $scope.formData.age = "";
                $scope.formData.favlang = "";

                gservice.refresh($scope.formData.latitude, $scope.formData.longitude);

            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
});
