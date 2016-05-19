/*
 Login controller
  */
app.controller('login', ['$scope', '$http', '$location', '$mdToast', 'authService', function($scope, $http, $location, $mdToast, authService){
    $scope.user = {username: "u", password: "u"};
        $scope.submit = function(user) {
        $http.post('/authenticate', user)
            .then(function(response){
                    //save json web token in session storage
                    authService.saveToken(response.data);

                    // redirect to events page
                    $location.path('/events');

            }, function(response) {
                    // wipe out the stored token
                    authService.logout();
                    $mdToast.showSimple(response.data);
            });
    };

    $scope.forgot = function(){
        $location.path('/forgot');
    };
}]);