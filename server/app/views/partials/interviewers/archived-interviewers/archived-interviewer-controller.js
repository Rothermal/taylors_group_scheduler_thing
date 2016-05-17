app.controller('ArchInterviewers', ['$scope', '$mdToast', 'InterviewerFactory', function($scope, $mdToast, InterviewerFactory){
    $scope.selected = [];
    $scope.interviewers = InterviewerFactory.query({isArchived: true});

    $scope.cancelSelected = function() {
        $scope.selected = [];
    };

    $scope.unarchive = function(interviewer){
        unarchive(interviewer);
    };

    $scope.unArchiveSelected = function(selected){
        var l = selected.length;
        $mdToast.showSimple('Unarchived ' + l + ' interviewers.');
        while(l--){
            var interviewer = selected[l];
            unarchive(interviewer);
            var i = $scope.selected.indexOf(interviewer);
            $scope.selected.splice(i, 1);
        }
    };

    function unarchive(interviewer){
        InterviewerFactory.update({id: interviewer._id}, {isArchived: false});
        var i = $scope.interviewers.indexOf(interviewer);
        $scope.interviewers.splice(i, 1);
    }
}]);