
/*
 Forgot controller
  */
app.controller('sendEmail', ['$scope', '$http', '$location', function($scope, $http, $location){
    $scope.send = function(email) {
        $http.post('/forgot', {email: email}).then(function (response) {
            if (response.status == 200) {
                $location.path('/');
            }
        });
    };
}]);