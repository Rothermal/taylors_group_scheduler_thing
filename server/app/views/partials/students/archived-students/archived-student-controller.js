app.controller('archStudents', ['$scope', '$mdToast', 'StudentFactory', function($scope, $mdToast, StudentFactory){
    $scope.selected = [];
    $scope.students = StudentFactory.query({isArchived: true});

    $scope.cancelSelected = function() {
        $scope.selected = [];
    };

    $scope.unArchiveSelected = function(selected){
        var l = selected.length;
        $mdToast.showSimple('Unarchived ' + l + ' students.');
        while(l--){
            var student = selected[l];
            unarchive(student);
            var i = $scope.selected.indexOf(student);
            $scope.selected.splice(i, 1);
        }
    };

    $scope.unarchive = function(student){
        unarchive(student);
    };

    function unarchive(student){
        StudentFactory.update({id: student._id}, {isArchived: false});
        var i = $scope.students.indexOf(student);
        $scope.students.splice(i, 1);
    }
}]);