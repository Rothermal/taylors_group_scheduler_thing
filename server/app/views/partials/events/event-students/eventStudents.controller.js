app.controller('eventStudents', ['$scope', '$rootScope', '$http', '$routeParams', '$mdDialog', 'EventFactory', function($scope, $rootScope, $http, $routeParams, $mdDialog, EventFactory){
    var eventParam = $routeParams._id;
    $scope.selected = [];

    var getStudents = function(){
        EventFactory.query({_id:eventParam}, function(data){
            $scope.students = data[0].students;
        });
    };

    getStudents();

    $rootScope.$on('eventStudents', function(){
        getStudents();
    });

    $scope.remove = function(student){
        var i = $scope.students.indexOf(student);
        $scope.students.splice(i, 1);
        $http.post('api/removeStudent?_id=' + eventParam, {_id: student._id});
    };

    $scope.editAvailability = function(id){
        $http.get('api/student?_id=' + id)
            .then(function(response){
                $scope.student = response.data[0];
                $mdDialog.show({
                    controller: 'availability',
                    locals: {
                        event: eventParam,
                        items: $scope.student
                    },
                    templateUrl: 'views/partials/dialogs/availability/availability.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true
                });
            });
    };

    $scope.addStudentDialog = function(){
        $http.get('api/student')
            .then(function(response){
                var students = response.data;
                var addedStudents = $scope.students;
                var i = students.length;

                while(i--){
                    addedStudents.forEach(function(student){
                        if(students[i] && students[i]._id == student._id){
                            students.splice(i, 1);
                        }
                    });
                }

                $mdDialog.show({
                    controller: 'addStudents',
                    locals: {
                        items: students
                    },
                    templateUrl: 'views/partials/dialogs/Event/addStudent.html',
                    parent: angular.element(document.body)
                });
            });
    };

}]);