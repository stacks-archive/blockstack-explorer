'use strict';

angular.module('insight.getinfo').controller('NodeInfoController',
function($scope, $rootScope, $routeParams, $location, Global, NodeInfoBlock,
  NodeInfoConsensus, NodeInfoServer, NodeZoneFileCount) {
  $scope.global = Global;
  $scope.loading = false;

  $scope.getInfo = function() {
    $scope.loading = true;

    NodeInfoBlock.get({}, function(response) {
      var nodeInfo = Object.assign({}, response)

      NodeInfoConsensus.get({}, function(response) {
        nodeInfo.consensus = response.consensus_hash
      }, function(e) {
        console.log(e)
      });

      NodeInfoServer.get({}, function(response) {
        nodeInfo.server_version = response.version
      }, function(e) {
        console.log(e)
      });

      NodeZoneFileCount.get({}, function(response) {
        nodeInfo.zonefile_count = response.count
      }, function(e) {
        console.log(e)
      });

      $scope.nodeInfo = nodeInfo;
    }, function(e) {
      console.log(e);

      $rootScope.flashMessage = 'Error loading Blockstack node info';

    });


  };

});
