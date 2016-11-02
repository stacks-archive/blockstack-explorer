'use strict';

angular.module('insight.zonefiles')
  .factory('Zonefile',
    function($resource) {
      return $resource(window.blockstackApiPrefix + '/get_name_zonefile/:domainName', {
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
