
/*
 Reset controller
  */
app.controller('reset',['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location){
    $scope.changePass = function(password, confirm){
        console.log(password);
        var token = $routeParams.token;
        if(password === confirm){
            $http.post('/reset', {password: password, token: token}).then(function(response){
                console.log(response);
                if(response.status === 200){
                    $location.path('/');
                }
            });
        }
    };
}]);