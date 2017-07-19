angular.module("BugTrackerApp")
	.service("SystemSvc", SystemSvc);

SystemSvc.$inject = ["$http", "$filter", "$location", "$route"];

function SystemSvc($http, $filter, $location, $route) {
	var self = this;
	self.about = "System Service";
	
	self.AjaxUrl = "http://localhost:28229";

	self.GetActiveUser = function() {
		return self.ActiveUser;
	}
	self.SetActiveUser = function(user) {
		self.ActiveUser = user;
	}

	self.VerifyUserLogin = function() {
		if(self.ActiveUser == undefined) {
			$location.path("/login");
		}
	}

	self.CheckIfUserLoggedIn = function() {
		if(self.ActiveUser != undefined) {
			return true;
		} else {
			return false;
		}
	}

	self.ConvertToJsonDate = function(value) {
		return $filter('date')(new Date(value), 'MM/dd/yyyy');
	}
}