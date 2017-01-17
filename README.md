# Blockstack Explorer

A Blockstack data explorer based on Insight UI (a Bitcoin blockchain explorer web application service for [Bitcore Node](https://github.com/bitpay/bitcore-node)) that uses the [Insight API](https://github.com/bitpay/insight-api).


## Installation instructions

Start with a clean install of Ubuntu 16.04.1 LTS. You'll need a significant
amount of disk space to hold the bitcore-indexed Bitcoin blockchain.
(~215gb as of block 440500).

### Set up your bitcore node

As root:

`apt-get update && apt-get dist-upgrade -y`

`apt-get install python-pip python-dev libzmq3-dev -y`

Install Node

`curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -`

`apt-get install -y nodejs`

Create a directory to hold your installation:

`mkdir /data`

`npm install -g bitcore-node`

Create your bitcore node:

`bitcore-node create /data/blockstack-bitcore`

Install insight-api and blockstack-explorer:

`cd /data/blockstack-bitcore/`

`./node_modules/.bin/bitcore-node install insight-api`

`./node_modules/.bin/bitcore-node install git+https://github.com/blockstack/blockstack-explorer.git#master`

Start bitcore & wait a long time while your bitcore-indexed Bitcoin node is created:

`./node_modules/.bin/bitcore-node start`

Depending on your disk speed and machine speed, this process can take days.

#### Making this setup production ready

In production, we've had difficulty with `bitcore-node` occasionally dying. In this
section, we'll discuss how to make sure the explorer processes get restarted
if they die.

In the default configuration described above, starting your `bitcore-node` also starts
a `bitcoind` node. When this happens, `bitcoind` usually lives on and restarting
`bitcore-node` fails since it can't start another `bitcoind` process on the same
port.

The solution is to start `bitcoind` externally.

To do this,
modify  `/data/blockstack-bitcore/bitcore-node.json` as follows:

```JSON
{
  "network": "livenet",
  "port": 3001,
  "services": [
    "bitcoind",
    "insight-api",
    "insight-ui",
    "web"
  ],
  "servicesConfig": {
    "bitcoind": {
      "connect": [
        {
		"rpcuser": "bitcoin",
		"rpcpassword": "local321",
		"zmqpubrawtx": "tcp://127.0.0.1:28332"
        }
       ]
    }
  }
}
```

Now, when you start your `bitcore-node`, it will expect to find a `bitcoind` process
already available on localhost with the default ports.

We use [pm2](https://github.com/Unitech/pm2) to keep an eye on our explorer processes
and make sure they start at boot and restart if there's a problem.

To install `pm2`:

`sudo npm install pm2 -g`

Move the 3 scripts found in `tools/deployment` in this repo to `/data/blockstack-bitcore`

Run the following to start the explorer processes and set them to start on boot:

```
pm2 start start_bitcoin.sh --name="bitcoind"
pm2 start start_bitcore.sh --name="bitcore"
pm2 start start_blockstack.sh --name="blockstack-server"
pm2 save
pm2 startup
```

If you're not running the explorer as root, the command `pm2 startup`
will fail and provide you a command to run as with `sudo` that will
make sure `pm2` and the explorer proceses start at boot.



### Setup a local copy of explorer api

Once your node is synced, you'll need to run a local copy of the explorer api script.

You'll first need a working installation of [blockstack-cli](https://github.com/blockstack/blockstack-cli).

This can be found in this repository in `tools/runserver.py`

You should run this in the same virtualenv as your blockstack-cli installation.
You'll need to install a couple additional packages:

`pip install --upgrade Flask`

`pip install --upgrade flask-crossdomain`

Run the explorer api as follows:

`cd tools/`

`./runserver.py`

This will start the explorer api on port 5000.

### Point your bitcore node to a local copies of explorer codebase:

If you want to use your local copy of the explorer api, you'll need to need to point your
bitcore-node to a local copy of this repository. You'll also need to do this if you're looking
to do development on the explorer.

To point your bitcore-node to a local explorer repository, you'll need to make a symlink to the local copy:

`cd /data/blockstack-bitcore/`

`./node_modules/.bin/bitcore-node stop`

`rm -Rf ./node_modules/insight-ui`

`ln -s <path-to-checkout-out-blockstack-explore-repo> ./node_modules/insight-ui`

Next, you'll need to edit `public/index.html` so that the web app knows the path
to your local explorer api by setting `window.blockstackApiPrefix` to the right
url.

In `<head>` there should be a tag similar to the following:

`<script language="javascript">window.blockstackApiPrefix = 'http://localhost:5000';</script>`

Finally, start your bitcore-node again:

`./node_modules/.bin/bitcore-node start`


To make sure changes to css and javascript are reflected without having to restart
the bitcore-node, run `grunt watch` in the root directory of the repository.
