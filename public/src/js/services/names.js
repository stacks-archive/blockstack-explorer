'use strict';

angular.module('insight.names')
  .factory('Name',
    function($resource, Global) {
      return $resource(window.blockstackApiPrefix + '/get_name_blockchain_history/:domainName', {
      domainName: '@domainName'
    }, {
      get: {
        method: 'GET',
        interceptor: {
          response: function (res) {

            var nameops = Global.convertHistoryToArray(res.data)
            var result = nameops[0];
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
      return $resource(window.blockstackApiPrefix + '/get_names_in_namespace/:namespaceId/:pageNum', {
      namespaceId: '@namespaceId',
      pageNum: '@pageNum'
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
  }).factory('NameRecord',
    function($resource) {
      return $resource(window.blockstackApiPrefix + '/get_name_blockchain_record/:domainName', {
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
  }).factory('Profile',
    function($resource) {
      return $resource(window.blockstackApiPrefix + '/lookup/:domainName', {
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
