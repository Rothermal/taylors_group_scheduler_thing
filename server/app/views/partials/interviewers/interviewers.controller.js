app.controller('interviewers', ['$scope', '$rootScope', '$mdDialog', '$mdToast', '$filter', 'InterviewerFactory', function($scope, $rootScope, $mdDialog, $mdToast, $filter, InterviewerFactory){
    $scope.selected = [];
    $scope.query = {
        filter: '',
        order: 'company'
    };

    //GET all interviewers
    var getInterviewers = function(query){
        $scope.interviewers = InterviewerFactory.query({isArchived:false}, function(response){
            $scope.filtered = $scope.interviewers.slice();
        });
    };

    getInterviewers();

    //filter interviewers depending on search input
    $scope.$watch('query.filter.$', function(newValue, oldValue) {
        if(newValue || oldValue){
            $scope.filtered = $filter('filter')($scope.interviewers, $scope.query.filter);
        }
    });

    $rootScope.$on('got/interviewers', function(){
        getInterviewers();
    });

    // clear search box and remove filter toolbar view
    $scope.removeFilter = function () {
        $scope.query.filter = '';
        $scope.filter.show = false;
    };

    // clear filter and cancel any selected items
    $scope.cancelSelected = function() {
        $scope.selected = [];
        $scope.query.filter = '';
    };

    // edit interviewer
    $scope.editInterviewer = function(id) {
        $scope.interviewer = InterviewerFactory.get({id: id});
        $mdDialog.show({
            controller: 'editInterviewer',
            locals: {items: $scope.interviewer},
            templateUrl: 'views/partials/dialogs/interviewer/interviewerEdit.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true
        });
    };

    // archive a single interviewer
    $scope.archive = function(interviewer){
        archiveInterviewer(interviewer);
        $mdToast.showSimple('Archived ' + interviewer.fName + ' ' + interviewer.lName + '.');
    };

    // archive a group of interviewerrs
    $scope.archiveSelected = function(interviewers){
        var l = interviewers.length;
        $mdToast.showSimple('Archived ' + l + ' interviewers.');
        while(l--){
            var interviewer = interviewers[l];
            archiveInterviewer(interviewer);
            var i = $scope.selected.indexOf(interviewer);
            $scope.selected.splice(i, 1);
        }
        $scope.removeFilter();
    };

    function archiveInterviewer(interviewer){
        InterviewerFactory.update({id: interviewer._id}, {isArchived: true});
        var i = $scope.filtered.indexOf(interviewer);
        var j = $scope.interviewers.indexOf(interviewer);
        $scope.interviewers.splice(j, 1);
        $scope.filtered.splice(i, 1);
    }
}]);

app.controller('editInterviewer', ['$scope', '$mdDialog', '$mdToast', 'items', 'InterviewerFactory', '$rootScope', function($scope, $mdDialog, $mdToast, items, InterviewerFactory, $rootScope){
 $scope.interviewer = items;

 $scope.edit = function(interviewer){
     InterviewerFactory.update({id: interviewer._id}, interviewer);
     $mdToast.showSimple('Edited ' + interviewer.fName + ' ' + interviewer.lName + '.');
     $rootScope.$broadcast('got/interviewers');
     $mdDialog.hide();
 };

 $scope.close = function(){
  $mdDialog.hide();
 }
}]);