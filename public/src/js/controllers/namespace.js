'use strict';

angular.module('insight.names').controller('NamespaceController',
function($scope, $rootScope, $routeParams, $location, Global, Namespace) {
  $scope.global = Global;
  $scope.loading = true;

  var _findNamespace = function(id) {
    Namespace.get({
      id: id
    }, function(response) {

      $scope.record = response;
      $scope.loading = false;

    }, function(e) {
      console.log(e);

      if (e.status === 400) {
        $rootScope.flashMessage = 'Invalid namespace: ' + id;
      } else if (e.status === 404) {
        $rootScope.flashMessage = 'Namespace Not Found'
      } else {
        $rootScope.flashMessage = 'Error loading namespace ' + id;
      }

    });
  };

  $scope.findThis = function() {
      _findNamespace($routeParams.id);
  };

});
