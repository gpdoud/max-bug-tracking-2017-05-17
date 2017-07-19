angular.module("BugTrackingApp")
	.service("UserSvc", UserSvc)

UserSvc.$inject = [];

function UserSvc() {
	var self = this;
	self.GetUsers = function() {
		return test 
	}
	self.GetUser = function(id) {
		return $http.get("http://localhost:21386/Users/Get/"+id)
	}
		self.AddUser = function(user) {
		return $http.get("http://localhost:21386/Users/Add", user)
	}

};