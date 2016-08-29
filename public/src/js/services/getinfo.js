'use strict';

angular.module('insight.getinfo')
  .factory('NodeInfo',
    function($resource) {
      return $resource('http://localhost:5000/getinfo', {
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
