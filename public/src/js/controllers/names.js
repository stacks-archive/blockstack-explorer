'use strict';

angular.module('insight.names').controller('NamesController',
function($scope, $rootScope, $routeParams, $location, Global, Name, NameHistory,
  Profile, Verifications) {
  $scope.global = Global;
  $scope.loading = false;
  $scope.webAccountTypes = Global.getWebAccountTypes()

  var _findName = function(domainName) {
    $scope.loading = true;

    if (domainName.indexOf('.') > -1) {
//      domainName = domainName.split('.')[0];
    } else {
      $rootScope.flashMessage = 'Invalid Name';
      $location.path('/');
    }

    NameHistory.get({
      domainName: domainName
    }, function(response) {
      var nameRecord = Object.assign({},
        response,
      {
        dataRecord: '',
        domainName: domainName,
        ownerAddress: response.address,
      });

      Name.get({
        domainName: domainName
      }, function(response) {
        nameRecord.expire_block = response.names.expire_block
      })

      $rootScope.titleDetail = nameRecord.domainName;
      $scope.nameRecord = nameRecord;

      Profile.get({
        domainName: domainName
      }, function(response) {
        $scope.person = new blockstack.Person(response[domainName]['profile'])
        $scope.verifications = response[domainName]['verifications']
        $scope.zonefile = response[domainName]['zone_file']
      })

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

  $scope.getAccountUrl = function(account) {
    if(account.service === 'pgp') {
      return account.contentUrl
    } else {
      var webAccountTypes = Global.getWebAccountTypes()
      var urlTemplate = webAccountTypes[account.service].urlTemplate
      return urlTemplate.replace('{identifier}', account.identifier)
    }
  };

  $scope.hasDisplayableProfile = function() {
    if($scope.person) {
      if($scope.person.name() || $scope.person.description() || $scope.person.address()) {
        return true
      }
      var profile = $scope.person.profile()
      if((profile && profile.account) && profile.account.length > 0) {
        return true
      }
    }
  }
  return false
});
