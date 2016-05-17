app.controller('addInterviewers', ['$scope', '$http', '$mdDialog', 'items', '$routeParams', '$rootScope', function($scope, $http, $mdDialog, items, $routeParams, $rootScope){
    var eventParam = $routeParams._id;

    for(var i = 0; i < items.length; i++){
        items[i].unadded = true;
    }

    $scope.interviewers = items;

    $scope.add = function(interviewer){
        $http.post('api/event/addInterviewer?_id=' + eventParam, {_id: interviewer._id})
            .then(function(response){
                interviewer.unadded = false;
                $rootScope.$broadcast('eventInterviewers');
            })
    };

    $scope.close = function(){
        $mdDialog.hide();
    }

}]);