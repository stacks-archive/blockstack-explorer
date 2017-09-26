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
      return $resource(window.blockstackApiPrefix + '/v1/blockchains/bitcoin/consensus', {
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
      return $resource(window.blockstackApiPrefix + '/v1/node/ping', {
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
  }).factory('NodeZoneFileCount',
    function($resource) {
      return $resource('/blockstack-node/RPC2', {
    }, {
      get: {
        method: 'POST',
        // Use direct xml rpc call to blockstackd since data not provided in core api
        transformRequest: function transformDataToXml(data, headersGetter) { 
          return "<?xml version='1.0'?><methodCall><methodName>get_num_names</methodName><params></params></methodCall>"
        },
        headers: {'Content-Type': 'application/xml'},
        interceptor: {
          response: function (res) {
            var responseString = res.data.match(/<string>(.*?)<\/string>/g)
            if (responseString.length > 0) {
              var data = JSON.parse(responseString[0].replace(/<\/?string>/g,''))
              return data
            }
            return {}
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