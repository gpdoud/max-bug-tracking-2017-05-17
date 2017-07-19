angular.module("BugTrackerApp")
	.controller("UsersCtrl", UsersCtrl);

UsersCtrl.$inject = ["$http", "$routeParams", "$location", "SystemSvc", "UserSvc"];

function UsersCtrl($http, $routeParams, $location, SystemSvc, UserSvc) {
	var self = this;
	self.AuthenticatedUser = SystemSvc.AuthenticatedUser;
	UserSvc.GetUsers()
		.then(
			function (resp) {
				console.log("SVC Success", resp);
					self.Users = resp.data;
			},
			function(err) {
				console.log("Error", err);
			}
		);
	self.SelectedUserID = $routeParams.id;
	self.PageTitle = "Users";
	self.NewUser = [];
	self.Users = [];

//Get Users**

	$http.get("http://localhost:28229/Users/List")
		.then (
			function(resp) {
				console.log("Success", resp);
					self.Users = resp.data; 
			},
			function(err) {
					console.log("Error", err);
			}
			)
//Get Selected User**
	$http.get("http://localhost:28229/Users/Get/"+self.SelectedUserID)
		.then (
			function(resp) {
				console.log("Success", resp);
					self.SelectedUserID = resp.data;
			},
			function(err) {
					console.log("Error", err);
			}
			)
//Create User**
	self.Create = function(user) {
		$http.post("http://localhost:28229/users/Create", user)
		.then(
			function(resp) {
				console.log("Success", resp);
					$location.path("/users")
			},
			function(err) {
					console.log("Error", err);
			}
			)
	}
//Edit User**
	self.Edit = function(user) {
		$http.post("http://localhost:28229/Users/Edit", user)
		.then(
			function(resp) {
				console.log("Success", resp);
					$location.path("/users")
			},
			function(err) {
					console.log("Error", err);
			}
		)
	}
//Remove User**
	self.Remove = function(issue) {
		$http.post("http://localhost:28229/Users/Remove", + id.toString())
		.then(
			function(resp) {
				console.log("Success", resp);
					$location.path("/users")
			},
			function(err) {
				console.log("Error", err);
			}
		)
	}
//User Login**
	self.Login = function (username, password) {
    self.Authenticated = false;
    for (var idx in self.Users) {
    	var user = self.Users[idx];
    	if (user.UserName == username && user.Password == password) {
    		self.Authenticated = true 
    		self.AuthenticatedUser = SystemSvc.AuthenticatedUser = user
    		$location.path("/")
    	}

    };
}