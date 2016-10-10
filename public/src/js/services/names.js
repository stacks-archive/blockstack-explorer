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

            /*
             * Convert history JSON object of block height keys & arrays of operations
             * to one array of name operations
             */
            var nameops = [];
            var history = res.data;
            for (var key in history) {
              if (history.hasOwnProperty(key)) {
                  for(var i = 0; i < history[key].length; i++) {
                    var nameop = history[key][i];
                    nameop.blockHeight = parseInt(key);
                    nameops.push(nameop);
                  }
              }
            }

            nameops.reverse();

            result = nameops[0];
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
