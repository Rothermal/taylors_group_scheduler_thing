
/*
Interviewer dialog controller
 */
app.controller('interviewer', ['$scope', '$mdDialog', '$http', '$rootScope', function($scope, $mdDialog){
    $scope.openInterviewer = function(ev){
        $mdDialog.show({
            controller: 'addInterviewer',
            templateUrl: 'views/partials/dialogs/interviewer/interviewer.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
    };
}]);

app.controller('addInterviewer', ['$scope', '$mdDialog', '$http', '$rootScope', function($scope, $mdDialog, $http, $rootScope){
    $scope.close = function() {
        $mdDialog.hide();
    };
    $scope.submit = function(interviewer){
        $http.post('api/interviewer', interviewer)
            .then(function(response){
                $rootScope.$broadcast('got/interviewers');
                $mdDialog.hide();
            })
    };
}]);

