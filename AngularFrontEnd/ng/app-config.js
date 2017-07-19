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
		.otherwise({
			redirectTo: '/'
		});
}