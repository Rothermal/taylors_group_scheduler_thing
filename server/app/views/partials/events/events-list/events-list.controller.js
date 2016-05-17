
/*
 Events list controller
  */
app.controller('eventsCtrl', ['$scope', '$filter', '$rootScope', 'EventFactory', function($scope, $filter, $rootScope, EventFactory) {

    var getEvents = function(){
        $scope.tiles = EventFactory.query({isArchived:false});
    };

    getEvents();

    $rootScope.$on('got/events', function(){
        getEvents();
    });
}]);


app.controller('modalCtrl', ['$scope', '$mdDialog', '$http', '$rootScope', function($scope, $mdDialog, $http, $rootScope) {
    $scope.alert = '';

    $scope.showAlert = function (id) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('You are about to Archive this Event!')
            .content('Click to confirm. You can access this Event at any time in Archived Events.')
            .ariaLabel('Archive')
            .ok('Got it!')
            .cancel('Nevermind.');

        $mdDialog.show(confirm).then(function () {
            $http.post('api/event/archive?_id=' + id, {isArchived: true})
                .then(function(response){
                    $scope.status = 'You archived this event.';
                    $rootScope.$broadcast('got/events');
                });

        }, function () {
            $scope.status = 'You did not archive this event.';
        });
    };

    $scope.showConfirm = function (id) {
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
                    $rootScope.$broadcast('got/events');
                });

        }, function () {
            $scope.status = 'You did not delete this event.';
        });
    };
}]);