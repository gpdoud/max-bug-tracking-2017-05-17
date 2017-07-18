angular.module("BugTrackingApp")
	.controller("IssuesCtrl", IssuesCtrl);

IssuesCtrl.$inject = ["$http", "$routeParams", "$location"];

function IssuesCtrl($http, $routeParams, $location) {
	var self = this;
	self.SelectedIssueID = $routeParams.id;
	self.PageTitle = "Issues";
	self.NewIssue = [];
	self.Issues = [];

//Get Issues**
	$http.get("http://localhost:21386/Issues/List")
		.then (
			function(resp) {
				console.log("Success", resp);
					self.Issues = resp.data; 
			},
			function(err) {
					console.log("Error", err);
			}
			)
//Get Selected Issue**
	$http.get("http://localhost:21386/Issues/Get/"+self.SelectedIssueID)
		.then (
			function(resp) {
				console.log("Success", resp);
					self.SelectedIssue = resp.data;
			},
			function(err) {
					console.log("Error", err);
			}
			)
//Create Issue**
	self.Create = function(issue) {
		$http.post("http://localhost:21386/Issues/Create", issue)
		.then(
			function(resp) {
				console.log("Success", resp);
					$location.path("/issues")
			},
			function(err) {
					console.log("Error", err);
			}
			)
	}
//Edit Issue**
	self.Edit = function(issue) {
		$http.post("http://localhost:21386/Issues/Edit", issue)
		.then(
			function(resp) {
				console.log("Success", resp);
					$location.path("/issues")
			},
			function(err) {
					console.log("Error", err);
			}
		)
	}
//Remove Issue**
	self.Remove = function(issue) {
		$http.post("http://localhost:21386/Issues/Remove", + id.toString())
		.then(
			function(resp) {
				console.log("Success", resp);
					$location.path("/issues")
			},
			function(err) {
				console.log("Error", err);
			}
		)
	}
}