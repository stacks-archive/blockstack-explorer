'use strict';

angular.module('insight.names')
  .factory('Name',
    function($resource, Global) {
      return $resource(window.blockstackApiPrefix + '/names/:domainName/history', {
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
      return $resource(window.blockstackApiPrefix + '/namespaces/:namespaceId/names?page=:pageNum', {
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
      return $resource('https://core.blockstack.org/v2/users/:domainName', {
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
  }).factory('Verifications',
    function($resource) {
      return $resource('https://core.blockstack.org/v2/users/:domainName', {
      domainName: '@domainName'
    }, {
      get: {
        method: 'GET',
        interceptor: {
          response: function (res) {
            const domainName = Object.keys(res.data)[0]
            const verificationsArray = res.data[domainName].verifications
            const verificationsObject = {}

            for(var i = 0; i < verificationsArray.length; i++) {
              const verification = verificationsArray[i]
              verificationsObject[verification.service] = verification
            }
            return verificationsObject;
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
