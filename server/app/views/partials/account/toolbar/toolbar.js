/*
 Toolbar controller
 */
app.controller('toolbar', ['$location','$scope', 'authService', function($location, $scope, authService){
    $scope.paths = true;
    $scope.user = authService.getUser();

    authService.observeUser().then(null, null, function(user){
        $scope.user = user;
        if(user.username) {
            $scope.paths = false;
        }
    });

    $scope.archivedEvents = function() {
        $location.path('/archived-events');
    };

    $scope.logout = function () {
        authService.logout();
        $scope.paths = true;
        $location.path('/');
    };
}]);