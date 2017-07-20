angular.module("BugTrackerApp")
	.service("UserSvc", UserSvc)

UserSvc.$inject = ["$http", "SystemSvc"];

function UserSvc($http, SystemSvc) {
	var self = this;

	var ctrlr = "/Users/";
	var url = SystemSvc.AjaxUrl + ctrlr;
	
	self.List = function() {
		return $http.get(url + "List");
	}
	self.Get = function(id) {
		return $http.get(url + "Get/" + id);
	}
	self.Change = function(user) {
		return $http.post(url + "Edit", user);
	}
	self.Add = function(user) {
		return $http.get(url + "Create", user);
	}
	self.Remove = function(user) {
		return $http.post(url + "Remove/" + id);
	}	
};