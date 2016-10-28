'use strict';

angular.module('insight.names').controller('OwnedController',
function($scope, $rootScope, $routeParams, $location, Global, Owned) {
  $scope.global = Global;
  $scope.loading = false;

  $scope.init = function(address) {
    Owned.get({
      address: address
    }, function(response) {
      $scope.names = response.names;
      $scope.loading = false;
    }, function(e) {
      console.log(e);

      if(e.status === 404) {
        $rootScope.flashMessage = 'Name Not Found'
      } else {
        $rootScope.flashMessage = 'Backend Error';
      }

      $location.path('/');
    });
  };

});
