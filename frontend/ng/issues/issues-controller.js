angular.module("BugTrackerApp")
	.controller("IssuesCtrl", IssuesCtrl);

IssuesCtrl.$inject = ["$http", "$routeParams", "$location", "$route", "IssuesSvc", "SystemSvc"];

function IssuesCtrl($http, $routeParams, $location, $route, IssuesSvc, SystemSvc) {
	var self = this;

	self.PageTitle = "Issues";

	self.SelectedIssueID = $routeParams.id;
	self.Issues = [];

	self.IsLoggedIn = SystemSvc.CheckIfUserLoggedIn();
	self.ActiveUser = SystemSvc.GetActiveUser();
	self.AdminRights = SystemSvc.GetAdminRights();

	self.Severity = self.Priority = ["High", "Medium", "Low"];
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
	if(self.IsLoggedIn) {
		self.NewIssue = {
			SubmittedByUserID: SystemSvc.GetActiveUser().ID
		};
	}
	self.Create = function(issue) {
		IssuesSvc.Add(issue).then(
			function(resp) {
				$location.path("/issues");
			},
			function(err) {
				console.log("Error", err);
			}
		);
	}

//Edit Issue**
	self.Edit = function(issue, boo) {
		IssuesSvc.Change(issue).then(
			function(resp) {
				if(boo) {
					$location.path("/issues");
				} else {
					$location.path("/issues/resolve/" + issue.ID);
				}
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
				$location.path("/issues");
			},
			function(err) {
				console.log("Error", err);
			}
		);
	}

	self.ResolveBug = function(issue) {
		issue.Status = "Open";
		issue.ResolvedByUserID = self.ActiveUser.ID;
		self.Edit(issue);
	}
}