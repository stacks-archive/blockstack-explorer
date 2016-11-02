'use strict';

angular.module('insight.names')
  .factory('Namespace',
    function($resource, Global) {
      return $resource(window.blockstackApiPrefix + '/get_namespace_blockchain_record/:id', {
      id: '@id'
    }, {
      all: {
        method: 'GET',
        url: (window.blockstackApiPrefix + '/get_all_namespaces'),
        interceptor: {
          response: function (res) {
            var results = [];
            for (var i = 0; i < res.data.namespaces.length; i++) {
              results.push({id: res.data.namespaces[i]})
            }
            return results;
          },
          responseError: function (res) {
            if (res.status === 404) {
              return res;
            }
          }
        }
      },
      getNumberOfNames: {
        method: 'GET',
        url: (window.blockstackApiPrefix + '/get_num_names_in_namespace/:id'),
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
      },
      get: {
        method: 'GET',
        url: (window.blockstackApiPrefix + '/get_namespace_blockchain_record/:id'),
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
