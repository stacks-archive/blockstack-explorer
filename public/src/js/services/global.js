'use strict';

//Global service for global variables
angular.module('insight.system')
  .factory('Global',[
    function() {
      return {
        /*
         * Convert history JSON object of block height keys & arrays of operations
         * to one array of name operations
         */
        convertHistoryToArray: function(history) {
          var nameops = [];
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

          return nameops;
        }
      }
    }
  ])
  .factory('Version',
    function($resource) {
      return $resource(window.apiPrefix + '/version');
  });
