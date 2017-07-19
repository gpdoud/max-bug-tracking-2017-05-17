angular.module("BugTrackingApp")
	.controller("UsersCtrl", UsersCtrl);

UsersCtrl.$inject = ["$http", "$routeParams", "$location"];

function UsersCtrl($http, $routeParams, $location) {
	var self = this;
	self.SelectedUserID = $routeParams.id;
	self.PageTitle = "Users";
	self.NewUser = [];
	self.Users = [];

//Get Users**
	$http.get("http://localhost:21386/Users/List")
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
	$http.get("http://localhost:21386/Users/Get/"+self.SelectedUserID)
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
		$http.post("http://localhost:21386/users/Create", user)
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
		$http.post("http://localhost:21386/Users/Edit", user)
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
		$http.post("http://localhost:21386/Users/Remove", + id.toString())
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