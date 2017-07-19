angular
    .module("BugTrackerApp")
    .config(BugTrackerConfig);

BugTrackerConfig.$inject = ["$routeProvider", "$locationProvider"];

function BugTrackerConfig($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');

    $routeProvider
        .when('/', {
            templateUrl: 'views/home-view.html'
        })
        .otherwise({
            redirectTo: '/'
        })
        .when('/users', {
            templateUrl: 'views/users-view.html',
            controller: 'UserCtrl',
            controllerAs: 'ctrl'
        })

        .when('/users/detail/:id', {
            templateUrl: 'views/users-detail-view.html',
            controller: 'UserCtrl',
            controllerAs: 'ctrl'
        })
        .when('/users/edit/:id', {
            templateUrl: 'views/users-edit-view.html',
            controller: 'UserCtrl',
            controllerAs: 'ctrl'
        })
        .when('/users/add/', {
            templateUrl: 'views/users-add-view.html',
            controller: 'UserCtrl',
            controllerAs: 'ctrl'
        })
        .when('/users/login/', {
            templateUrl: 'views/users-login-view.html',
            controller: 'UserCtrl',
            controllerAs: 'ctrl'
        }) 

}