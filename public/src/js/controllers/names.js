'use strict';

angular.module('insight.names').controller('NamesController',
function($scope, $rootScope, $routeParams, $location, Global, Name, Zonefile, NameRecord) {
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

      $rootScope.titleDetail = nameRecord.domainName;
      $scope.nameRecord = nameRecord;

      Zonefile.get({
        domainName: domainName
      }, function(response) {
        $scope.zonefile = response;
        $scope.loading = false;
      });


      NameRecord.get({
        domainName: domainName
      }, function(response) {
         $scope.nameRecord.expire_block = response.expire_block
      });

    }, function(e) {
      console.log(e);

      if (e.status === 400) {
        $rootScope.flashMessage = 'Invalid Domain Name: ' + $routeParams.domainName;
      } else if (e.status === 404) {
        $scope.domainNameNotFound = domainName
        $scope.loading = false
      } else {
        $rootScope.flashMessage = 'Error loading name ' + domainName;
      }

    })
  };

  $scope.findThis = function() {
    _findName($routeParams.domainName);
  };

});
