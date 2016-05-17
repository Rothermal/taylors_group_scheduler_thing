app.controller('eventInterviewers', ['$scope', '$rootScope', '$http', '$routeParams', '$mdDialog', 'EventFactory', function($scope, $rootScope, $http, $routeParams, $mdDialog, EventFactory){
    var eventParam = $routeParams._id;
    $scope.selected = [];

    var getInterviewers = function(){
        EventFactory.query({_id: eventParam}, function(data){
            $scope.interviewers = data[0].interviewers;
        });
    };

    getInterviewers();

    $rootScope.$on('eventInterviewers', function(){
        getInterviewers();
    });

    $scope.remove = function(interviewer){
        var i = $scope.interviewers.indexOf(interviewer);
        $scope.interviewers.splice(i, 1);
        $http.post('api/removeInterviewer?_id=' + eventParam, {_id: interviewer._id});
    };

    $scope.editAvailability = function(id){
        $http.get('api/interviewer?_id=' + id)
            .then(function(response){
                $scope.interviewer = response.data[0];
                $mdDialog.show({
                    controller: 'availability',
                    locals: {
                        event: eventParam,
                        items: $scope.interviewer
                    },
                    templateUrl: 'views/partials/dialogs/availability/availability.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true
                });
            });
    };

    $scope.addInterviewerDialog = function(){
        $http.get('api/interviewer')
            .then(function(response){
                var interviewers = response.data;
                var addedInterviewers = $scope.interviewers;
                var i = interviewers.length;

                while(i--){
                    addedInterviewers.forEach(function(interviewer){
                        if(interviewers[i] && interviewers[i]._id == interviewer._id){
                            interviewers.splice(i, 1);
                        }
                    });
                }

                $mdDialog.show({
                    controller: 'addInterviewers',
                    locals: {
                        items: interviewers
                    },
                    templateUrl: 'views/partials/dialogs/Event/addInterviewers.html',
                    parent: angular.element(document.body)
                });
            });
    };
}]);