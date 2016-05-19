
/*
 Event details factory that parses out various information about the event
 */
app.factory('eventDetails', ['$http','$mdDialog','$filter',  function($http, $mdDialog, $filter) {
    var returnEvent = {};
    var edit = function(eventParam) {
        //console.log('edit() doing something?');
        console.log('eventid', eventParam);

        //var id = function(){
        //    return '2';
        //}

        $http.get('/api/event/' + eventParam).then(function(response){


            returnEvent.event = {
                id: response.data._id,
                cohort: response.data.cohort,
                type: response.data.type,
                date: $filter('date')(new Date(response.data.date), 'MM/dd/yy'),
                startTime: response.data.startTime,
                endTime: response.data.endTime,
                interviewDuration: response.data.interviewDuration
            };



            $mdDialog.show({
                controller: 'viewEventCtrl',
                locals: {
                    items: returnEvent.event
                },
                templateUrl: 'views/partials/dialogs/Event/editEvent.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true
            });


        });



    };

    return {
        edit : edit,
        returnEvent : returnEvent,
        variables: function(eventParam) {
            return $http.get('api/event/' + eventParam).then(function success(response) {
                var eventTime = {};
                eventTime.schedule = response.data.schedule;
                eventTime.startTime = response.data.startTime;
                eventTime.endTime = moment(response.data.endTime, 'h:mm A').format('HH:mm');
                eventTime.eventLength = moment(eventTime.endTime, 'HH:mm').diff(moment(eventTime.startTime, 'HH:mm'), 'minutes');
                eventTime.slotLength = moment.duration(response.data.interviewDuration, 'minutes').asMinutes();
                eventTime.slotCount = parseInt(Math.floor(eventTime.eventLength/eventTime.slotLength).toFixed(0));

                return eventTime;
            });
        }
    };
}]);