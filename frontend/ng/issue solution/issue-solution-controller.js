angular.module("BugTrackerApp")
	.controller("IssueSolutionCtrl", IssueSolutionCtrl);

IssueSolutionCtrl.$inject = ["$http", "$routeParams", "$location", "$route", "IssueSolutionSvc", "IssueSvc", "SystemSvc"];

function IssueSolutionCtrl($http, $routeParams, $location, $route, IssueSolutionSvc, IssueSvc, SystemSvc) {
	var self = this;

	self.PageTitle = "Issue Solution";

	self.SelectedIssueSolutionID = $routeParams.id;

	self.IsLoggedIn = SystemSvc.CheckIfUserLoggedIn();
	self.ActiveUser = SystemSvc.GetActiveUser();
	self.AdminRights = SystemSvc.GetAdminRights();

//Get IssueSolutions**
	IssueSolutionSvc.List().then (
		function(resp) {
			self.IssueSolutions = resp.data; 
			for(var idx in self.IssueSolutions) {
				self.IssueSolutions[idx].DateEntered = SystemSvc.ConvertToJsonDate(self.IssueSolutions[idx].DateEntered);
			}
		},
		function(err) {
			console.log("Error", err);
		}
	);

//Get Selected IssueSolution**
	IssueSolutionSvc.Get(self.SelectedIssueSolutionID).then (
		function(resp) {
			self.SelectedIssueSolution = resp.data;
			self.SelectedIssueSolution.DateEntered = SystemSvc.ConvertToJsonDate(self.SelectedIssueSolution.DateEntered);
		},
		function(err) {
			console.log("Error", err);
		}
	);

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

//Create IssueSolution**
	if(self.IsLoggedIn) {
		self.NewIssueSolution = {
			UserID: SystemSvc.GetActiveUser().ID
		};
	}
	self.Create = function(solution) {
		IssueSolutionSvc.Add(solution).then(
			function(resp) {
				
			},
			function(err) {
				console.log("Error", err);
			}
		);
	}

//Edit IssueSolution**
	self.Edit = function(solution) {
		IssueSolutionSvc.Change(solution).then(
			function(resp) {

			},
			function(err) {
				console.log("Error", err);
			}
		);
	}

//Remove IssueSolution**
	self.Delete = function(id) {
		IssueSolutionSvc.Remove(id).then(
			function(resp) {

			},
			function(err) {
				console.log("Error", err);
			}
		);
	}
}