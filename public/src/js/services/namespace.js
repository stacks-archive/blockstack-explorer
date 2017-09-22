'use strict';

angular.module('insight.names')
  .factory('Namespace',
    function($resource, Global) {
      return $resource(window.blockstackApiPrefix + '/namespaces/:id', {
      id: '@id'
    }, {
      all: {
        method: 'GET',
        isArray: true,
        url: (window.blockstackApiPrefix + '/namespaces'),
        interceptor: {
          response: function (res) {
            var results = [];
            for (var i = 0; i < res.data.length; i++) {
              results.push({id: res.data[i]})
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
        // temporary endpoint until name_count endpoint is implemented in core API
        url: 'https://explorer-api.appartisan.com/get_num_names_in_namespace/:id',
        // url: (window.blockstackApiPrefix + '/get_num_names_in_namespace/:id'),
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
