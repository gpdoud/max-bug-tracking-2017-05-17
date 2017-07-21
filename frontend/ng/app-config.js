angular.module("BugTrackerApp")
	.config(BugTrackerConfig);

BugTrackerConfig.$inject = ["$routeProvider", "$locationProvider"];

function BugTrackerConfig($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix('');

	$routeProvider
		.when('/', {
			templateUrl: 'views/home-view.html'
		})
		.when('/issues', {
			templateUrl: 'views/issue views/issues-view.html',
			controller: 'IssuesCtrl',
			controllerAs: 'ctrl'
		})
		.when('/issues/edit/:id', {
			templateUrl: 'views/issue views/issues-edit.html',
			controller: 'IssuesCtrl',
			controllerAs: 'ctrl'
		})
		.when('/issues/details/:id', {
			templateUrl: 'views/issue views/issues-detail.html',
			controller: 'IssuesCtrl',
			controllerAs: 'ctrl'
		})
		.when('/issues/add', {
			templateUrl: 'views/issue views/issues-add.html',
			controller: 'IssuesCtrl',
			controllerAs: 'ctrl'
		})
		.when('/issues/resolve/:id', {
			templateUrl: 'views/issue views/resolve-issue-view.html',
			controller: 'IssuesCtrl',
			controllerAs: 'ctrl'
		})
		.when('/issues/resolve/details/:id', {
			templateUrl: 'views/issue views/resolve-issue-details.html',
			controller: 'IssuesCtrl',
			controllerAs: 'ctrl'
		})
		.when('/login', {
			templateUrl: 'views/login-view.html',
			controller: 'AuthenticationCtrl', 
			controllerAs: 'ctrl'
		})
		.when('/users', {
			templateUrl: 'views/user views/user-view.html',
			controller: 'UserCtrl',
			controllerAs: 'ctrl'
		})
		.when('/users/detail/:id', {
			templateUrl: 'views/user views/user-detail-view.html',
			controller: 'UserCtrl',
			controllerAs: 'ctrl'
		})
		.when('/users/edit/:id', {
			templateUrl: 'views/user views/user-edit-view.html',
			controller: 'UserCtrl',
			controllerAs: 'ctrl'
		})
		.when('/users/add/', {
			templateUrl: 'views/user views/user-add.html',
			controller: 'UserCtrl',
			controllerAs: 'ctrl'
		})
		.otherwise({
			redirectTo: '/'
		});
}