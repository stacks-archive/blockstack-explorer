'use strict';

angular.module('insight.names')
  .factory('Namespace',
    function($resource) {
      return $resource(window.blockstackApiPrefix + '/get_namespace_blockchain_record/:id', {
      id: '@id'
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
