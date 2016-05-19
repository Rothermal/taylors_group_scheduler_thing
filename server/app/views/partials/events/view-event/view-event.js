/*
 View events controller
 */
app.controller('viewEventCtrl', ['$scope', '$mdDialog' ,'$http', '$filter', '$routeParams', '$rootScope', 'eventDetails', function($scope, $mdDialog, $http, $filter, $routeParams, $rootScope, eventDetails) {

    var EventDetails = eventDetails;
    var eventParam = $routeParams._id;
    $scope.eventId = eventParam;

    var getEvents = function(){
        $http.get('/api/event/' + eventParam).then(function(response){
            var start = (response.data.startTime);
            var newStart = start.split(':');
            var hour = parseInt(newStart[0]);
            if(hour > 12){
                hour = hour  - 12;
                tod = "PM";
            }   else {
                tod = "AM";
            }
            //var startTime =  hour + ":" +newStart[1]+" "+tod;

            var end = (response.data.endTime);
            var newEnd = end.split(':');
            var ehour = parseInt(newEnd[0]);
            if(ehour > 12){
                ehour = ehour  - 12;
                etod = "PM";
            }   else {
                etod = "AM";
            }
            //var endTime =  ehour + ":" +newEnd[1]+" "+etod;
            var endTime = moment(response.data.endTime).format('LT');
            var startTime = moment(response.data.startTime).format('LT');
            //startTime = startTime.getHours() + ":" + startTime.getMinutes();

            $scope.fullEvent = response.data;
            $scope.event = {
                id: response.data._id,
                cohort: response.data.cohort,
                type: response.data.type,
                date: $filter('date')(new Date(response.data.date), 'MM/dd/yy'),
                startTime: startTime,
                endTime: endTime,
                interviewDuration: response.data.interviewDuration
            };
        });
    };

    getEvents();

    $scope.editEventControlled = {a: "I am controlled!"};

    var returnEvent = {};
    $scope.id = '';

    $scope.edit = eventDetails.edit;
    $scope.event2 = EventDetails.returnEvent;

    $scope.save = function (event) {

        $http.put('api/event?_id=' + event.id, event)
            .then(function (response) {
                $rootScope.$broadcast('getEvent');
                $mdDialog.hide();
            });
    }

}]);