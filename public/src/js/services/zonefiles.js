'use strict';

angular.module('insight.zonefiles')
  .factory('Zonefile',
    function($resource) {
      return $resource(window.blockstackApiPrefix + '/v1/names/:domainName/zonefile', {
      domainName: '@domainName'
    }, {
      get: {
        method: 'GET',
        interceptor: {
          response: function (res) {
            return res.data.zonefile;
          },
          responseError: function (res) {
            if (res.status === 404) {
              return res;
            }
          }
        }
      }
    });
  })
