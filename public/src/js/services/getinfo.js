'use strict';

angular.module('insight.getinfo')
  .factory('NodeInfo',
    function($resource) {
      return $resource(blockstackNode + '/RPC2', {
    }, {
      get: {
        method: 'POST',
        // Use direct xml rpc call to blockstackd since data not provided in core api
        transformRequest: function transformDataToXml(data, headersGetter) { 
          return "<?xml version='1.0'?><methodCall><methodName>getinfo</methodName><params></params></methodCall>"
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