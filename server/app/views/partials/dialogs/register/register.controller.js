
/*
Register dialog controller
 */
app.controller('registerOpen', ['$scope', '$mdDialog', '$http', function($scope, $mdDialog, $http){

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

    $scope.register = function(user){
        console.log('hit post',user);
        $http.post('/api/users', {
            username: user.username,
            email: user.email,
            password: user.password
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


}]);

//app.controller( 'register',['$scope','$mdDialog','$http',function ($scope, $http, $mdDialog) {
//
//
//
//}]);