angular.module("BugTrackerApp")
    .service("SystemSvc", SystemSvc);

SystemSvc.$inject = ["$http", "$filter", "$location", "$route"];

function SystemSvc($http, $filter, $location, $route) {
    var self = this;
    self.about = "System Service";
    
    self.AjaxUrl = "http://localhost:28229";

     self.ConvertToJsonDate = function(value) {
         return $filter('date')(new Date(value), 'MM/dd/yyyy');
    }
}