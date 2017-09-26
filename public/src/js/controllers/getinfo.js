'use strict';

angular.module('insight.getinfo').controller('NodeInfoController',
function($scope, $rootScope, $routeParams, $location, Global, NodeInfo) {
  $scope.global = Global;
  $scope.loading = false;

  $scope.getInfo = function() {
    $scope.loading = true;

    NodeInfo .get({}, function(response) {
      $scope.nodeInfo = response
    }, function(e) {
      console.log(e);
      $rootScope.flashMessage = 'Error loading Blockstack node info';
    });

  };

});
