'use strict';

angular.module('insight.getinfo')
  .factory('NodeInfoBlock',
    function($resource) {
      return $resource('/insight-api/sync', {
    }, {
      get: {
        method: 'GET',
        interceptor: {
          response: function (res) {
            var results = {
              last_block_processed: res.data.height,
              last_block_seen: res.data.blockChainHeight
            }
            return results
          },
          responseError: function (res) {
            if (res.status === 404) {
              return res;
            }
          }
        }
      }
    });
  }).factory('NodeInfoConsensus',
    function($resource) {
      return $resource(window.blockstackApiPrefix + '/blockchains/bitcoin/consensus', {
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
  }).factory('NodeInfoServer',
    function($resource) {
      return $resource(window.blockstackApiPrefix + '/node/ping', {
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
  });