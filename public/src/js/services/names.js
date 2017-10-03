'use strict';

angular.module('insight.names')
  .factory('Name',
    function($resource, Global) {
      return $resource(window.blockstackApiPrefix + '/v1/names/:domainName', {
      domainName: '@domainName'
    }, {
      get: {
        method: 'GET',
        interceptor: {
          response: function (res) {
            return {names: res.data};
          },
          responseError: function (res) {
            if (res.status === 404) {
              return res;
            }
          }
        }
      }
    });
  }).factory('NameHistory',
    function($resource, Global) {
      return $resource(window.blockstackApiPrefix + '/v1/names/:domainName/history', {
      domainName: '@domainName'
    }, {
      get: {
        method: 'GET',
        interceptor: {
          response: function (res) {
            
            var nameops = Global.convertHistoryToArray(res.data)
            var result = Object.assign({}, nameops[0]);
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
  }).factory('NamesInNamespace',
    function($resource) {
      return $resource(window.blockstackApiPrefix + '/v1/namespaces/:namespaceId/names?page=:pageNum', {
      namespaceId: '@namespaceId',
      pageNum: '@pageNum'
    }, {
      get: {
        method: 'GET',
        isArray: true,
        interceptor: {
          response: function (res) {
            return {names: res.data};
          },
          responseError: function (res) {
            if (res.status === 404) {
              return res;
            }
          }
        }
      }
    });
  }).factory('Profile',
    function($resource) {
      return $resource('/v2/users/:domainName', {
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
  });
