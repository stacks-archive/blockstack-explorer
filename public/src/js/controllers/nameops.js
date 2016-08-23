'use strict';

angular.module('insight.nameops').controller('NameopsController',
function($scope, $rootScope, $routeParams, $location, Global, Nameops) {
  $scope.global = Global;
  $scope.loading = false;

  var _loadBlock = function(blockHeight) {
    $scope.loading = true;

    $scope.blockHeight = blockHeight;

    Nameops.get({
      blockHeight: blockHeight
    }, function(response) {
      var nameops = response;



      $scope.loading = false;

      $scope.nameops = nameops.nameops;
      $scope.stats = nameops.stats;
    }, function(e) {
      console.log(e);

      $rootScope.flashMessage = 'Backend Error';

      $location.path('/');
    });

  };

  $scope.findThis = function() {
    $scope.blockHeight = 111
    _loadBlock($routeParams.blockHeight);
  };

  $scope.loadBlock = function(blockHeight) {
    _loadBlock(blockHeight);
  };

});
