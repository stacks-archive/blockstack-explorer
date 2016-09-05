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

            /*
             * Convert history JSON object of block height keys & arrays of operations
             * to one array of name operations
             */
            var nameops = [];
            var history = res.data.history;
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
            res.data.history = nameops;

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
