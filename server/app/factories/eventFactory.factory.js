app.factory('EventFactory', ['$resource', function($resource) {
    var data = $resource('api/event/:id', {id: "@id"}, {
        update: {method: 'PUT'},
        students: {method: 'GET', params: {'studentsOnly': 'true'}, isArray: true}
    });
    return data;
}]);