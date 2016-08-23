'use strict';

angular.module('insight.names').controller('NamesController',
function($scope, $rootScope, $routeParams, $location, Global, Name) {
  $scope.global = Global;
  $scope.loading = false;

  var _findName = function(domainName) {
    $scope.loading = true;

    if (domainName.indexOf('.') > -1) {
//      domainName = domainName.split('.')[0];
    } else {
      $rootScope.flashMessage = 'Invalid Name';
      $location.path('/');
    }

    Name.get({
      domainName: domainName
    }, function(response) {
      var nameRecord = response;
      nameRecord.dataRecord = "";
      nameRecord.domainName = domainName;
      nameRecord.ownerAddress = nameRecord.address;

      $scope.loading = false;
      $rootScope.titleDetail = nameRecord.domainName;
      $scope.nameRecord = nameRecord;
    }, function(e) {
      console.log(e);

      if (e.status === 400) {
        $rootScope.flashMessage = 'Invalid Domain Name: ' + $routeParams.domainName;
      } else if (e.status === 404) {
        $rootScope.flashMessage = 'Name Not Found'
      } else {
        $rootScope.flashMessage = 'Backend Error';
      }

      $location.path('/');
    })
  };

  $scope.findThis = function() {
    _findName($routeParams.domainName);
  };

});
