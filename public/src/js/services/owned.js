'use strict';

angular.module('insight.names')
  .factory('Owned',
    function($resource) {
      return $resource(window.blockstackApiPrefix + '/addresses/bitcoin/:address', {
      address: '@address'
    }, {
      get: {
        method: 'GET',
        interceptor: {
          response: function (res) {
            var names = res.data;
            return names;
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
