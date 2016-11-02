'use strict';

angular.module('insight.names')
  .factory('Namespace',
    function($resource, Global) {
      return $resource(window.blockstackApiPrefix + '/get_namespace_blockchain_record/:id', {
      id: '@id'
    }, {
      get: {
        method: 'GET',
        interceptor: {
          response: function (res) {
            var result = res.data;
            result.history =  Global.convertHistoryToArray(res.data.history);
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
