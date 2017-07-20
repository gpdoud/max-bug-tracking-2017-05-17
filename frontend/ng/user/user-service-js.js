angular.module("PrsApp")
	.service("UserSvc", UserSvc)

UserSvc.$inject = ["$http"];

function UserSvc($http) {
	var self = this;
	
	self.GetUsers = function() {
		return $http.get("http://localhost:28229//Users/List")
	}
	self.GetUser = function(id) {
		return $http.get("http://localhost:28229/Users/Get/"+id)
	}
	self.CreateUser = function(user) {
		return $http.get("http://localhost:28229/Users/Create", user)
	}
	self.EditUser = function(user) {
		$http.post("http://localhost:28229/Users/Edit", user)
	}
	self.RemoveUser = function(user) {
		$http.post("http://localhost:28229/Users/Remove", + id.toString())
	}	
};