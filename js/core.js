// public/core.js
var nodeApp = angular.module('nodeApp', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('/getdata')
        .success(function (data) {
            $scope.data = data;
            console.log(data);
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });
}
