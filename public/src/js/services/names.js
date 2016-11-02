'use strict';

angular.module('insight.names')
  .factory('Name',
    function($resource) {
      return $resource(window.blockstackApiPrefix + '/get_name_blockchain_history/:domainName', {
      domainName: '@domainName'
    }, {
      get: {
        method: 'GET',
        interceptor: {
          response: function (res) {

            var nameops = Global.convertHistoryToArray(res.data)
            var result = nameops[0];
            result.history  = nameops;

            return result;
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
