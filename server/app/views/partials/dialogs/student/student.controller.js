
/*
Add Student dialog controller
 */
app.controller('student', ['$scope', '$mdDialog', function($scope, $mdDialog){
    $scope.openStudents = function(){
        $mdDialog.show({
            controller: 'addStudent',
            templateUrl: 'views/partials/dialogs/student/student.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true
        });
    };
}]);

app.controller('addStudent', ['$scope', '$mdDialog', '$http', '$rootScope', 'StudentFactory', function($scope, $mdDialog, $http, $rootScope, StudentFactory) {
    $scope.close = function () {
        $mdDialog.hide();
    };

    $scope.submit = function(student){
        StudentFactory.save(student);
        $rootScope.$broadcast('got/students');
        $mdDialog.hide();
    };
}]);