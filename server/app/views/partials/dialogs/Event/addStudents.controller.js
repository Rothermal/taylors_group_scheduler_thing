/**
 * Created by robbynewman on 5/23/16.
 */
app.controller('addStudents', ['$scope', '$http', '$mdDialog', 'items', '$routeParams', '$rootScope', function($scope, $http, $mdDialog, items, $routeParams, $rootScope){
    var eventParam = $routeParams._id;

    for(var i = 0; i < items.length; i++){
        items[i].unadded = true;
    }

    $scope.students = items;

    $scope.add = function(student){
        $http.post('api/event/addStudent?_id=' + eventParam, {_id: student._id})
            .then(function(response){
                student.unadded = false;
                $rootScope.$broadcast('eventStudents');
            })
    };

    $scope.close = function(){
        $mdDialog.hide();
    }

}]);