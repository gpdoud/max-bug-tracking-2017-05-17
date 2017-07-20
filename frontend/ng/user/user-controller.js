angular.module("BugTrackerApp")
	.controller("UserCtrl", UserCtrl);

UserCtrl.$inject = ["$http", "$routeParams", "$location", "SystemSvc", "UserSvc"];

function UserCtrl($http, $routeParams, $location, SystemSvc, UserSvc) {
	var self = this;
	self.AuthenticatedUser = SystemSvc.GetActiveUser();
	UserSvc.List()
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
}