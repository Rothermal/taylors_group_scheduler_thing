
/*
Register dialog controller
 */
app.controller('registerOpen', ['$scope', '$mdDialog', '$http', function($scope, $mdDialog){

    $scope.clicked = function(){
      console.log('clicked');

    };
    $scope.openRegister = function(ev){
        console.log('clicked should be open');
        $mdDialog.show({
            //controller: 'registerOpen',
            templateUrl: 'views/partials/dialogs/register/register.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        });
    };
    function register($scope, $http, $mdDialog) {
        $scope.register = function(username, email, password){
            console.log('hit post');
            $http.post('/api/users', {
                username: username,
                email: email,
                password: password
            }).then(function(response){
                console.log('posted',response);
                if(response == 200) {
                    $mdDialog.hide();
                }
            });
        };
        $scope.close = function(){
            $mdDialog.hide();
        };
    }
}]);