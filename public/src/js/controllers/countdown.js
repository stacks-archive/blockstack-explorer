'use strict';

angular.module('insight.countdown').controller('CountdownController', 
function($scope, $interval) {
	function calculateTimeRemaining() {
		const registrationEndDate = "Wednesday, November 15 2017 15:00:00 EDT"
		const endDate = moment(registrationEndDate);
		const remainingHours =  endDate.diff(moment(), 'hours')
		const remainingMinutes = endDate.diff(moment(), 'minutes')
		$scope.days = Math.floor(remainingHours/24);
		$scope.hours = remainingHours - $scope.days*24;
		$scope.minutes = remainingMinutes - remainingHours*60;
	}

	calculateTimeRemaining();

	$interval(function(){
		calculateTimeRemaining();
	}, 60*1000);

});