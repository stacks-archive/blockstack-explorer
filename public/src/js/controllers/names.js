'use strict';

angular.module('insight.names').controller('NamesController',
function($scope, $rootScope, $routeParams, $location, Global, Name, NameHistory,
  Profile) {
  $scope.global = Global;
  $scope.loading = false;
  $scope.webAccountTypes = Global.getWebAccountTypes();

  var _findName = function(domainName) {
    $scope.loading = true;

    var blockstackIDRegex = /^[A-Za-z0-9_]+\.[A-Za-z0-9_]+$/

    if(!blockstackIDRegex.test(domainName)) {
      $rootScope.flashMessage = 'Invalid Name';
      $location.path('/')
      return;
    }

    NameHistory.get({
      domainName: domainName
    }, function(response) {

      if(!response.address) {
        $scope.domainNameNotFound = domainName
        return;
      }

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
        $scope.zonefile = response[domainName]['zone_file']

        var verificationsArray = response[domainName]['verifications']
        const verificationsObject = {}

        for(var i = 0; i < verificationsArray.length; i++) {
          const verification = verificationsArray[i]
          verificationsObject[verification.service] = verification
        }

        $scope.verifications = verificationsObject
        $scope.loading = false
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

  $scope.getServiceString = function(service) {
    if (service === 'ssh' || service === 'pgp' || service === 'bitcoin' || service === 'ethereum') {
      return service;
    } else {
      return '@' + service;
    }
  }

  $scope.getIdentifierString = function (service, identifier) {
    if (service === 'ssh' || service === 'pgp' || service === 'bitcoin' || service === 'ethereum') {
      return identifier.substring(0, 60) + ((identifier && identifier.length > 60) ? '...' : '');
    } else {
      return identifier;
    }
  }

  $scope.shouldVerify = function (service) {
    if (service === 'ssh' || service === 'pgp' || service === 'bitcoin' || service === 'ethereum') {
      return false;
    } else {
      return true;
    }
  }

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
