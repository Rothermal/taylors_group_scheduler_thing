app.controller('availability', ['$scope', '$http', '$mdDialog', 'items', 'event', function($scope, $http, $mdDialog, items, event){
    $scope.interviewer = items;
    $scope.eventId = event;

    if(!$scope.interviewer.unavailable[event]){
        $scope.interviewer.unavailable[event] = {};
    }

    //get selected event
    $http.get('api/event?_id=' + event)
        .then(function(response){
            //set time slots
            var event = response.data[0],
                duration = (parseInt(event.endTime) - parseInt(event.startTime)) * 60,
                slots = Math.floor(duration / event.interviewDuration),
                count = slots,
                times = [{intTime: moment(event.startTime, 'HH:mm').format('h:mm A')}];

            while(count--){
                times.push({intTime: moment(event.startTime, 'HH:mm')
                    .add((event.interviewDuration * (slots - count)), 'minutes')
                    .format('h:mm A')})
            }
            times.pop();
            $scope.times = times;
        });

    $scope.save = function(interviewer){
        $http.post('api/interviewer/unavail?_id=' + interviewer._id, interviewer.unavailable)
            .then(function(response){
                $mdDialog.hide();
            })
    };

    $scope.close = function(){
        $mdDialog.hide();
    }
}]);