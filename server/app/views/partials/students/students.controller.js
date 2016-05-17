app.controller('students', ['$scope', '$mdDialog', '$mdToast', '$rootScope', 'StudentFactory', '$filter', function($scope, $mdDialog, $mdToast, $rootScope, StudentFactory, $filter){
    $scope.selected = [];
    $scope.query = {
        filter: '',
        order: 'fName'
    };
    $scope.filtered = [];

    //GET all students
    var getStudents = function(query){
        $scope.students = StudentFactory.query(query, function(response){
            $scope.filtered = $scope.students.slice();
        });
    };

    getStudents();

    // filter students depending on search input
    $scope.$watch('query.filter.$', function(newValue, oldValue) {
        if(newValue || oldValue){
            $scope.filtered = $filter('filter')($scope.students, $scope.query.filter);
        }
    });

    $rootScope.$on('got/students', function(){
        getStudents();
    });

    // clear search field and remove filter toolbar view
    $scope.removeFilter = function () {
        $scope.query.filter = '';
        $scope.filter.show = false;
    };

    // clear filter and cancel any selected items
    $scope.cancelSelected = function() {
        $scope.selected = [];
        $scope.query.filter = '';
    };

    // edit student
    $scope.editStudent = function(id) {
        $scope.student = StudentFactory.get({id: id});
        $mdDialog.show({
            controller: 'editStudent',
            locals: {items: $scope.student},
            templateUrl: 'views/partials/dialogs/student/studentEdit.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true
        });
    };

    // archive a group of students
    $scope.archiveSelected = function(students){
        var l = students.length;
        $mdToast.showSimple('Archived ' + l + ' students.');
        while(l--){
            var student = students[l];
            archiveStudent(student);
            var i = $scope.selected.indexOf(student);
            $scope.selected.splice(i, 1);
        }
        $scope.removeFilter();
    };

    // archive a single student
    $scope.archive = function(student){
        archiveStudent(student);
        $mdToast.showSimple('Archived ' + student.fName + ' ' + student.lName + '.');
    };

    function archiveStudent(student){
        StudentFactory.update({id: student._id}, {isArchived: true});
        var i = $scope.filtered.indexOf(student);
        var j = $scope.students.indexOf(student);
        $scope.students.splice(j, 1);
        $scope.filtered.splice(i, 1);
    }
}]);

app.controller('editStudent', ['$scope', '$mdDialog', '$mdToast', 'items', '$rootScope', 'StudentFactory', function($scope, $mdDialog, $mdToast, items, $rootScope, StudentFactory){
    $scope.student = items;

    $scope.edit = function(student){
        StudentFactory.update({id: student._id}, student);
        $mdToast.showSimple('Edited ' + student.fName + ' ' + student.lName + '.');
        $rootScope.$broadcast('got/students');
        $mdDialog.hide();
    };

    $scope.close = function(){
        $mdDialog.hide();
    }
}]);