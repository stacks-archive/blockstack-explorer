## Production docker setup instructions for blockstack-explorer

Start with a clean install of Ubuntu 16.04.1 LTS. 

### Set up bitcore node 

Attach cloned disk with indexed bitcore-node (needs ~500GB)

Mount disk as `/bitcoin-data`

As root:

`apt-get update && apt-get dist-upgrade -y`

`apt-get install python-pip python-dev libzmq3-dev -y`

Install Node

`curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -`

`apt-get install -y nodejs`

Install bitcore-node

`npm install -g bitcore-node`

Install Insight API and Blockstack Explorer

`cd /bitcoin-data/blockstack-bitcore/`

`./node_modules/.bin/bitcore-node install insight-api`

`./node_modules/.bin/bitcore-node install git+https://github.com/blockstack/blockstack-explorer.git#master`

Start bitcore & wait for it to index

`./node_modules/.bin/bitcore-node start`

This part shouldn't take too long since we are starting with an nearly fully indexed node

### Set up blockstack core

Use existing blockstack core image

Change the config to use a local node:

Edit ~/.blockstack/client.ini, change the protocol, server and port

`sed -i 's/protocol = https/protocol = http/' ~/.blockstack/client.ini`
`sed -i 's/server = node.blockstack.org/server = localhost/' ~/.blockstack/client.ini`
`sed -i 's/port = 6263/port = 6264/' ~/.blockstack/client.ini`

### Nginx config

```
server {
        listen 80 default_server;
        listen [::]:80 default_server;
        ssl_dhparam /etc/ssl/certs/dhparam.pem;

        root /var/www/html;

        index index.html index.htm index.nginx-debian.html;

        server_name explorer.blockstack.org;

        # Insight API and Explorer
        location / {
                proxy_pass http://127.0.0.1:3001;
        }

        # Blockstack core API
        location /core-api/ {
                proxy_pass http://127.0.0.1:6270/;
        }

        # Blockstack node
        location /blockstack-node/ {
                proxy_pass http://127.0.0.1:6264/;
        }

        listen 443 ssl; # managed by Certbot
        ssl_certificate /etc/letsencrypt/live/explorer.blockstack.org/fullchain.pem; # managed by Certbot
        ssl_certificate_key /etc/letsencrypt/live/explorer.blockstack.org/privkey.pem; # managed by Certbot
        include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
}
```

