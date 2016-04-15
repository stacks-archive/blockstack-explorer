'use strict';

angular.module('insight.names')
  .factory('Name',
    function($resource) {
    return $resource('https://api.onename.com/v1/users/:domainName', {
      domainName: '@domainName'
    }, {
      get: {
        method: 'GET',
        interceptor: {
          response: function (res) {
            return res.data;
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
