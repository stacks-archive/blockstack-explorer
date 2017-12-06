'use strict';

angular.module('insight.names').controller('NamespaceController',
function($scope, $rootScope, $routeParams, $location, Global, Namespace) {
  $scope.global = Global;
  $scope.loading = true;

  var _findNamespace = function(id) {
    Namespace.get({
      id: id
    }, function(response) {
      $rootScope.titleDetail = id;
      $scope.record = response;
      $scope.loading = false;

    }, function(e) {
      console.log(e);

      if (e.status === 400) {
        $rootScope.flashMessage = 'Invalid namespace: ' + id;
      } else if (e.status === 404) {
        $scope.namespaceNotFound = id
        $scope.loading = false
      } else {
        $rootScope.flashMessage = 'Error loading namespace ' + id;
      }

    });
  };

  var _loadAll = function() {
    Namespace.all({}, function(response) {
      var namespaces = response;
      for (var i = 0; i < namespaces.length; i++) {
        $scope.counter = i;
        Namespace.getNumberOfNames({id: namespaces[i].id}, function(countResponse) {
          // namespaces[$scope.counter].numberOfNames = countResponse.count;
          if (namespaces[0].id === 'id') {
            namespaces[0].numberOfNames = countResponse.count
          }
        });
      }
      $scope.namespaces = namespaces;
    }, function(e) {
      console.log(e);
        $rootScope.flashMessage = 'Error loading namespaces';
    });
  };

  $scope.findThis = function() {
    _findNamespace($routeParams.id);
  };

  $scope.listAll = function() {
    _loadAll();
  };

});
