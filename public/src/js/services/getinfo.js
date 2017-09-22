'use strict';

angular.module('insight.getinfo')
  .factory('NodeInfo',
    function($resource) {
      return $resource(window.blockstackApiPrefix + '/blockchains/bitcoin/consensus', {
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
