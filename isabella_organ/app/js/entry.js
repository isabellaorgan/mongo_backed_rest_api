require('angular/angular');
var angular = window.angular;

var albumApp = angular.module('albumstream', []);
albumApp.controller('GreetingController', ['$scope', function($scope) {
	$scope.greeting = 'Hello World, Collect some albums and listen to them';

	$scope.alertGreeting = function() {
		alert($scope.greeting);
	};
}]);