
/*
 Event details factory that parses out various information about the event
 */
app.factory('eventDetails', ['$http', function($http) {
    return {
        variables: function(eventParam) {
            return $http.get('api/event/' + eventParam).then(function success(response) {
                var eventTime = {};
                eventTime.schedule = response.data.schedule;
                eventTime.startTime = moment(response.data.startTime, 'h:mm A').format('HH:mm');
                eventTime.endTime = moment(response.data.endTime, 'h:mm A').format('HH:mm');
                eventTime.eventLength = moment(eventTime.endTime, 'HH:mm').diff(moment(eventTime.startTime, 'HH:mm'), 'minutes');
                eventTime.slotLength = moment.duration(response.data.interviewDuration, 'minutes').asMinutes();
                eventTime.slotCount = parseInt(Math.floor(eventTime.eventLength/eventTime.slotLength).toFixed(0));

                return eventTime;
            });
        }
    };
}]);