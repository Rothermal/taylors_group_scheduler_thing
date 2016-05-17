/*
 Profile controller
  */
app.controller('profile', ['$scope', '$http', 'authService', '$location', function($scope, $http, authService, $location){
    $scope.user = authService.getUser();

    $scope.save = function(user){
        var edit = {
            _id: user._id,
            username: user.username,
            password: user.password,
            email: user.email
        };
        $http.put('/api/profile', edit)
            .then(function(response){
                console.log(response);
            if(response.status === 200){
                $location.path('/events');
            }
        });
    };
}]);