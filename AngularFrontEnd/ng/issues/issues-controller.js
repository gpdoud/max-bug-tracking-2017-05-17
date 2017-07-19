
angular.module("BugTrackerApp")
	.controller("IssuesCtrl", IssuesCtrl);

IssuesCtrl.$inject = ["$http", "$routeParams", "$location", "IssuesSvc", "SystemSvc"];

function IssuesCtrl($http, $routeParams, $location, IssuesSvc, SystemSvc) {
	var self = this;

	self.PageTitle = "Issues";

	self.SelectedIssueID = $routeParams.id;
	self.NewIssue = [];
	self.Issues = [];

	self.Severity = ["High", "Medium", "Low"];
	self.Priority = ["High", "Medium", "Low"];
	self.Status = ["New", "Open", "Resolved", "Closed"];

//Get Issues**
	IssuesSvc.List().then (
		function(resp) {
			self.Issues = resp.data; 
			for(var idx in self.Issues) {
				self.Issues[idx].DateEntered = SystemSvc.ConvertToJsonDate(self.Issues[idx].DateEntered);
			}
		},
		function(err) {
			console.log("Error", err);
		}
	);
//Get Selected Issue**
	IssuesSvc.Get(self.SelectedIssueID).then (
		function(resp) {
			self.SelectedIssue = resp.data;
			self.SelectedIssue.DateEntered = SystemSvc.ConvertToJsonDate(self.SelectedIssue.DateEntered);
		},
		function(err) {
			console.log("Error", err);
		}
	);
//Create Issue**
	self.Create = function(issue) {
		IssuesSvc.Add(issue).then(
			function(resp) {
				$location.path("/issues")
			},
			function(err) {
				console.log("Error", err);
			}
		);
	}
//Edit Issue**
	self.Edit = function(issue) {
		IssuesSvc.Change(issue).then(
			function(resp) {
				$location.path("/issues")
			},
			function(err) {
				console.log("Error", err);
			}
		);
	}
//Remove Issue**
	self.Delete = function(id) {
		IssuesSvc.Remove(id).then(
			function(resp) {
				$location.path("/issues")
			},
			function(err) {
				console.log("Error", err);
			}

		);
	}
}