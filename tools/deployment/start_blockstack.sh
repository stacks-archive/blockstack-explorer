#!/bin/bash

# blockstack-server won't start if bitcoind isn't ready to accept connections
# wait for 30 seconds to make give bitcoind time to start up on boot 
sleep 30
blockstack api stop
blockstack api start
