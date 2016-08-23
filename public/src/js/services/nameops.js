'use strict';

angular.module('insight.nameops')
  .factory('Nameops',
    function($resource) {
      return $resource('http://localhost:5000/get_nameops_at/:blockHeight', {
      blockHeight: '@blockHeight'
    }, {
      get: {
        method: 'GET',
        interceptor: {
          response: function (res) {

            var result = res.data
            result.stats = {
              name_preorders: 0,
              name_registrations: 0,
              name_updates: 0,
              name_transfers: 0,
              name_revokes: 0,
              name_imports: 0,
              namespace_preorders: 0,
              namespace_reveals: 0
            }
            for (var i = 0; i < result.nameops.length; i++) {
              switch(result.nameops[i].opcode) {
                case "NAME_PREORDER":
                  result.stats.name_preorders++;
                  break;
                case "NAME_REGISTRATION":
                  result.stats.name_registrations++;
                  break;
                case "NAME_UPDATE":
                  result.stats.name_updates++;
                  break;
                case "NAME_TRANSFER":
                  result.stats.name_transfers++;
                  break;
                case "NAME_REVOKE":
                  result.stats.name_revokes++;
                  break;
                case "NAME_IMPORT":
                  result.stats.name_imports++;
                  break;
                case "NAMESPACE_PREORDER":
                  result.stats.namespace_preorders++;
                  break;
                case "NAMESPACE_REVEAL":
                  result.stats.namespace_reveals++;
                  break;
                }
            }
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
