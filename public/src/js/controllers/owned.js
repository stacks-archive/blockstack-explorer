'use strict';

angular.module('insight.names').controller('OwnedController',
function($scope, $rootScope, $routeParams, $location, Global, Owned, Profile) {
  $scope.global = Global;
  $scope.loading = false;
  $scope.webAccountTypes = Global.getWebAccountTypes()

  $scope.init = function(address) {
    Owned.get({
      address: address
    }, function(response) {
      $scope.names = response.names;
      $scope.profiles = []

      response.names.forEach(function(domainName){
        Profile.get({
          domainName: domainName
        }, function(response) {
          var profile = {domainName: domainName}

          profile.person = new blockstack.Person(response[domainName]['profile'])
          profile.zonefile = response[domainName]['zone_file']

          var verificationsArray = response[domainName]['verifications']
          const verificationsObject = {}

          for(var i = 0; i < verificationsArray.length; i++) {
            const verification = verificationsArray[i]
            verificationsObject[verification.service] = verification
          }

          profile.verifications = verificationsObject
          $scope.profiles.push(profile)
        })
      })

      $scope.loading = false;
    }, function(e) {
      console.log(e);

      if(e.status === 404) {
        $rootScope.flashMessage = 'Address Not Found'
      } else {
        $rootScope.flashMessage = 'Error loading names owned by ' + address;
      }
    });
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
  
  $scope.hasDisplayableProfile = function(person) {
    if(person) {
      if(person.name() || person.description() || person.address()) {
        return true
      }
      var profile = person.profile()
      if((profile && profile.account) && profile.account.length > 0) {
        return true
      }
    }
  }

});
