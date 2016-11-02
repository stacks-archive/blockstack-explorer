'use strict';

var TRANSACTION_DISPLAYED = 10;
var BLOCKS_DISPLAYED = 5;
var BLOCKSTACK_CONFIRMATIONS_REQUIRED = 6;
var OPERATIONS_DISPLAYED = 10;

/* from FIRST_BLOCK_MAINNET in blockstack/lib/config.py  */
var BLOCKSTACK_GENESIS_BLOCK = 373601;

var BLOCKSTACK_CORE_V14_FORK_BLOCK_HEIGHT = 436650;

angular.module('insight.system').controller('IndexController',
  function($scope, $rootScope, Global, getSocket, Blocks, NodeInfo, Nameops) {
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

        $scope.blocksTilFork = BLOCKSTACK_CORE_V14_FORK_BLOCK_HEIGHT - $scope.blocks[0].height;
        $scope.forkBlockHeight = BLOCKSTACK_CORE_V14_FORK_BLOCK_HEIGHT;

        //_getOperations();
      });
    };

    var _getOperations = function() {
      var nameops = [];

      /* Iterate through blocks starting with last processed block
      * in descending block height order, searching for name operations
      * until we have at least OPERATIONS_DISPLAYED operations
      */
      for(var height = $scope.blocks[0].height;
        height >= 428000 && nameops.length < OPERATIONS_DISPLAYED; height--) {
        Nameops.get({
          blockHeight: height
        }, function(response) {
          for(var j = 0; j < response.nameops.length && nameops.length < OPERATIONS_DISPLAYED; j++) {
            nameops.push(response.nameops[j]);
          }
        });
      }

      $scope.nameops = nameops;
    };

    var socket = getSocket($scope);

    var _startSocket = function() {
      socket.emit('subscribe', 'inv');
      // socket.on('tx', function(tx) {
      //   $scope.txs.unshift(tx);
      //   if (parseInt($scope.txs.length, 10) >= parseInt(TRANSACTION_DISPLAYED, 10)) {
      //     $scope.txs = $scope.txs.splice(0, TRANSACTION_DISPLAYED);
      //   }
      // });

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
