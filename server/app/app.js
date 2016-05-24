var app = angular.module('app', ['ngMaterial', 'ngRoute', 'ngMessages', 'ui.grid', 'ui.grid.edit', 'ui.grid.rowEdit', 'ui.grid.exporter', 'ui.grid.pinning', 'ngFileUpload', 'ngResource', 'md.data.table']);

/*
 Angular configuration
 */
app.config(['$routeProvider', '$locationProvider', '$mdThemingProvider', '$httpProvider', function($routeProvider, $locationProvider, $mdThemingProvider, $httpProvider){

    // Color palette
    $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey')
        .accentPalette('orange')
        .backgroundPalette('grey');

    // HTML5 mode
    $locationProvider.html5Mode({
        enabled: true
    });

    // Routes
    $routeProvider.
        when('/home', {
            templateUrl: 'views/partials/home/home.html'
        }).
        when('/', {
            templateUrl: 'views/partials/account/login/login.html'
        }).
        when('/forgot', {
            templateUrl: 'views/partials/account/forgot/forgot.html'
        }).
        when('/events', {
            templateUrl: 'views/partials/events/events-list/events-list.html'
        }).
        when('/event?:eventId', {
            templateUrl: 'views/partials/events/view-event/view-event.html'
        }).
        when('/event/event-students?:eventId', {
            templateUrl: 'views/partials/events/event-students/event-students.html'
        }).
        when('/event/event-interviewers?:eventId', {
            templateUrl: 'views/partials/events/event-interviewers/eventInterviewers.html'
        }).
        when('/event/interviewersRank?:eventId', {
            templateUrl: 'views/partials/rankings/interviewer-rank.html'
        }).
        when('/event/studentsRank?:eventId', {
            templateUrl: 'views/partials/rankings/student-rank.html'
        }).
        when('/event/schedule?:eventId', {
            templateUrl: 'views/partials/events/schedule/schedule.html'
        }).
        when('/students', {
            templateUrl: 'views/partials/students/students.html'
        }).
        when('/interviewers', {
            templateUrl: 'views/partials/interviewers/interviewers.html'
        }).
        when('/archived-events', {
            templateUrl: 'views/partials/events/archived-events/archived-events.html'
        }).
        when('/archived-students', {
            templateUrl: 'views/partials/students/archived-students/archived-students.html'
        }).
        when('/archived-interviewers', {
            templateUrl: 'views/partials/interviewers/archived-interviewers/archived-interviewers.html'
        }).
        when('/profile', {
            templateUrl: 'views/partials/account/profile/profile.html'
        }).
        when('/logout', {
            templateUrl: 'views/partials/account/logout/logout.html'
        }).
        when('/new-event', {
            templateUrl: 'views/partials/events/new-event/new-event.html'
        }).
        when('/reset/:token', {
            templateUrl: 'views/partials/account/reset/reset.html',
            controller: 'reset'
        }).
        otherwise({
            redirectTo: '/'
    });

    $httpProvider.interceptors.push('authInterceptor');
}]);


/*
Directive to check the passwords are the same
 */
app.directive("passwordVerify", function() {
    return {
        require: "ngModel",
        scope: {
            passwordVerify: '='
        },
        link: function(scope, element, attrs, ctrl) {
            scope.$watch(function() {
                var combined;
                if (scope.passwordVerify || ctrl.$viewValue) {
                    combined = scope.passwordVerify + '_' + ctrl.$viewValue;
                }
                return combined;
            }, function(value) {
                if (value) {
                    ctrl.$parsers.unshift(function(viewValue) {
                        var origin = scope.passwordVerify;
                        if (origin !== viewValue) {
                            ctrl.$setValidity("passwordVerify", false);
                            return undefined;
                        } else {
                            ctrl.$setValidity("passwordVerify", true);
                            return viewValue;
                        }
                    });
                }
            });
        }
    };
});

/* directive to format date */
angular.module('app')
    .directive("formatDate", function(){
        return {
            require: 'ngModel',
            link: function(scope, elem, attr, modelCtrl) {
                modelCtrl.$formatters.push(function(modelValue){
                    return new Date(modelValue);
                });
            }
        };
    });