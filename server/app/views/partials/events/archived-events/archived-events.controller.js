/*
Archived events controller
 */
app.controller('archivedEventsCtrl', ['$scope', 'EventFactory', '$rootScope', function($scope, EventFactory, $rootScope) {

    var archived = function(){
        $scope.tiles = EventFactory.query({isArchived: true});
    };

    archived();

    $rootScope.$on('got/archivedEvents', function(){
        archived();
    });
}]);

app.controller('archivedEventsModal', ['$scope', '$mdDialog', '$http', '$rootScope', function($scope, $mdDialog, $http, $rootScope) {
    $scope.alert = '';

    $scope.deleteEvent = function (id) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete this Event?')
            .content('This will permanently delete this Event.')
            .ariaLabel('Delete')
            .ok('Yes, delete this Event!')
            .cancel('No way, that was close!');

        $mdDialog.show(confirm).then(function () {
            $http.delete('api/event?_id=' + id)
                .then(function(response){
                    $scope.status = 'You deleted this event.';
                    $rootScope.$broadcast('got/archivedEvents');
                });

        }, function () {
            $scope.status = 'You did not delete this event.';
        });
    };
}]);