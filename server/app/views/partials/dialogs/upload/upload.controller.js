/*
Student dialog controller
 */
app.controller('uploads', ['$scope', '$mdDialog', function($scope, $mdDialog){
    $scope.openUploads = function(ev){
        $mdDialog.show({
            controller: 'uploadFile',
            templateUrl: 'views/partials/dialogs/upload/upload.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        });
    };
}]);

app.controller('uploadFile', ['$scope', '$mdDialog', 'Upload', '$location', '$rootScope', function($scope, $mdDialog, Upload, $location, $rootScope){
    var target = $location.path();

    // upload on file select or drop
    $scope.upload = function (file) {
        Upload.upload({
            url: '/api/upload',
            data: {file: file, target: target}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded.');
            $mdDialog.hide();
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        }).then(function redirect (){
            $rootScope.$broadcast('got' + target);
        });
    };

    $scope.close = function() {
        $mdDialog.hide();
    };
}]);