'use strict';

angular.module('insight.names')
  .factory('Name',
    function($resource) {
      return $resource('http://localhost:5000/get_name_blockchain_record/:domainName', {
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
