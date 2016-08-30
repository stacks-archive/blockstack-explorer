'use strict';

var TRANSACTION_DISPLAYED = 10;
var BLOCKS_DISPLAYED = 5;
var BLOCKSTACK_CONFIRMATIONS_REQUIRED = 6;

angular.module('insight.system').controller('IndexController',
  function($scope, $rootScope, Global, getSocket, Blocks, NodeInfo) {
    $scope.global = Global;

    var _getBlockstackNodeInfo = function() {
      NodeInfo.get({}, function(response) {
        $scope.blockstackNodeInfo = response;
        _getBlocks();
        _startSocket();
      }, function(e) {
        console.log(e);

        $rootScope.flashMessage = 'Backend Error';

        $location.path('/');
      });
    };

    var _getBlocks = function() {
      Blocks.get({
        limit: (BLOCKS_DISPLAYED + BLOCKSTACK_CONFIRMATIONS_REQUIRED)
      }, function(res) {

        $scope.blocks = res.blocks.slice(BLOCKSTACK_CONFIRMATIONS_REQUIRED, res.blocks.length);
        $scope.blocksLength = $scope.blocks.length;
      });
    };

    var socket = getSocket($scope);

    var _startSocket = function() {
      socket.emit('subscribe', 'inv');
      socket.on('tx', function(tx) {
        $scope.txs.unshift(tx);
        if (parseInt($scope.txs.length, 10) >= parseInt(TRANSACTION_DISPLAYED, 10)) {
          $scope.txs = $scope.txs.splice(0, TRANSACTION_DISPLAYED);
        }
      });

      socket.on('block', function() {
        _getBlocks();
      });
    };

    socket.on('connect', function() {
      _startSocket();
    });



    $scope.humanSince = function(time) {
      var m = moment.unix(time);
      return m.max().fromNow();
    };

    $scope.index = function() {
      _getBlockstackNodeInfo();
    };

    $scope.txs = [];
    $scope.blocks = [];
  });
