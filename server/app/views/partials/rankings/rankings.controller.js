app.controller('studentRank', ['$scope','$http', '$routeParams', function($scope, $http, $routeParams){
    var event = $routeParams._id;
    $scope.weight = {
        value: 0
    };

    var getWeights = function(){
        $http.get('api/event?_id='+ event).then(function(response){
            $scope.interviewers = response.data[0].interviewers;
            $scope.students = response.data[0].students;
            $scope.weights = response.data[0].studentWeight;
        });
    };

    getWeights();

    $scope.save = function(student, interviewer, weight){
        $http.post('api/event/studentWeight?_id=' + event, {
            studentId: student,
            interviewerId: interviewer,
            weight: weight.value
        }).then(function(response){
            getWeights();
        });
    };

    $scope.remove = function(weight){
        $http.post('api/event/studentWeight/remove?_id=' + event, {
            interviewerName: weight.interviewerName,
            studentName: weight.studentName,
            weight: weight.weight
        })
            .then(function(response){
                getWeights();
            });
    };

}]);

app.controller('interviewerRank', ['$scope','$http', '$routeParams', function($scope, $http, $routeParams){
    var event = $routeParams._id;
    $scope.weight = {
        value: 0
    };


    var getWeights = function(){
        $http.get('api/event?_id='+ event).then(function(response){
            $scope.interviewers = response.data[0].interviewers;
            $scope.students = response.data[0].students;
            $scope.weights = response.data[0].interviewerWeight;
        });
    };

    getWeights();


    $scope.remove = function(weight){
        $http.post('api/event/interviewerWeight/remove?_id=' + event, {
            interviewerName: weight.interviewerName,
            studentName: weight.studentName,
            weight: weight.weight
        })
            .then(function(response){
                console.log(response);
                getWeights();
            });
    };

    $scope.save = function(interviewer, student, weight){
        $http.post('api/event/interviewerWeight?_id=' + event, {
            interviewerId: interviewer,
            studentId: student,
            weight: weight.value
        }).then(function(response){
            getWeights();
        });
    };
}]);