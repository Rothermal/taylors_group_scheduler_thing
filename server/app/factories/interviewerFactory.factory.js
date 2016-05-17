app.factory('InterviewerFactory', ['$resource', function($resource) {
    var data = $resource('api/interviewer/:id', {id: "@id"}, {
        update: {
            method: 'PUT'
        }
    });
    return data;
}]);