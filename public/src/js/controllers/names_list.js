'use strict';

angular.module('insight.names').controller('NamesListController',
function($scope, $rootScope, $routeParams, $location, Namespace, NamesInNamespace) {
  $scope.loadingNames = false;

  var pageNum = 0;
  var pagesTotal = 1;
  var hasMore = true;
  $scope.names = [];

  var _listNamesInNamespace = function(namespaceId) {
    $rootScope.titleDetail = namespaceId;
    $scope.namespaceId = namespaceId;

    Namespace.all({}, function(response) {
      $scope.namespaces = response;

    }, function(e) {
      console.log(e);
      $rootScope.flashMessage = 'Error loading namespaces';
    });


    Namespace.getNumberOfNames({id: namespaceId}, function(response) {
      $scope.numberOfNames = response.count;

    }, function(e) {
      console.log(e);

      if (e.status === 400) {
        $rootScope.flashMessage = 'Invalid namespace: ' + namespaceId;
      } else if (e.status === 404) {
        $rootScope.flashMessage = 'Namespace Not Found'
      } else {
        $rootScope.flashMessage = 'Error loading namespace ' + namespaceId;
      }
    });

    $scope.loadMore();

  };


  //Load more transactions for pagination
  $scope.loadMore = function() {
    if (hasMore && !$scope.loadingNames) {
      $scope.loadingNames = true;
      NamesInNamespace.get({
        namespaceId: $scope.namespaceId,
        pageNum: pageNum}, function(data) {
          _paginate(data);
        });
    }
  };

  var _paginate = function(data) {
    $scope.loadingNames = false;

    hasMore = data.names.length > 0 ? true : false
    pageNum += 1;
    data.names.forEach(function(name) {
      $scope.names.push(name);
    });
  };


  $scope.listNamesInNamespace = function() {
    _listNamesInNamespace($routeParams.namespaceId);
  };

});
