
/*
 New event controller
  */
app.controller('newEventCtrl', ['$scope', '$http', '$location', '$filter', function($scope, $http, $location, $filter) {
    $scope.submit = function(event) {
        //
        //console.log('event.startTime before filter', event.startTime);
        //
        //event.startTime = $filter('date')(new Date(event.startTime), 'HH:mm');
        //console.log('event.startTime', event.startTime);
        //event.endTime = $filter('date')(new Date(event.endTime), 'HH:mm');

        $http({
            method: 'POST',
            url: 'api/event',
            data: event
        }).then(function success(data) {
        }, function error() {}).then(function redirect() {
            $location.path('/events');
        });
    };
}]);