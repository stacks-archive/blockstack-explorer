'use strict';

angular.module('insight.countdown').controller('CountdownController', 
function($scope, $interval) {
	function calculateTimeRemaining() {
		const registrationEndDate = "Wednesday, November 15 2017 15:00:00 EST"
		const endDate = moment(registrationEndDate);
		const remainingHours =  endDate.diff(moment(), 'hours')
		const remainingMinutes = endDate.diff(moment(), 'minutes')
		$scope.days = Math.max(0, Math.floor(remainingHours/24));
		$scope.hours = Math.max(0, remainingHours - $scope.days*24);
		$scope.minutes = Math.max(0, remainingMinutes - remainingHours*60);
	}

	calculateTimeRemaining();

	$interval(function(){
		calculateTimeRemaining();
	}, 60*1000);

});