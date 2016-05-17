app.factory('StudentFactory', ['$resource', function($resource) {
    var data = $resource('api/student/:id', {student: "@student"}, {
        update: {
            method: 'PUT'
        }
    });
    return data;
}]);