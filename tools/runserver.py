#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os

from flask import Flask, jsonify
from flask_crossdomain import crossdomain

from blockstack_client import client as bs_client

bs_client.session(server_host="node.blockstack.org", server_port=6264)

app = Flask(__name__)

@app.route('/get_name_blockchain_record/<fqu>', methods=['GET'])
@crossdomain(origin='*')
def get_name_blockchain_record(fqu):
    try:
        blockchain_record = bs_client.get_name_blockchain_record(fqu)
        return jsonify(blockchain_record), 200
    except Exception as e:
        return jsonify(str(e)), 500

@app.route('/get_nameops_at/<blocknum>', methods=['GET'])
@crossdomain(origin='*')
def get_nameops_at(blocknum):
    try:
        nameops = {}
        nameops["nameops"] = bs_client.get_nameops_at(int(blocknum))
        return jsonify(nameops), 200
    except Exception as e:
        return jsonify(str(e)), 500

@app.route('/getinfo', methods=['GET'])
@crossdomain(origin='*')
def ping():
    try:
        result = bs_client.getinfo()
        return jsonify(result), 200
    except Exception as e:
        return jsonify(str(e)), 500

@app.route('/get_latest_nameops/<number>', methods=['GET'])
@crossdomain(origin='*')
def get_latest_nameops(number):
    try:
        result = []
        info = bs_client.getinfo()
        height = int(info["last_block"])
        # from FIRST_BLOCK_MAINNET in blockstack/lib/config.py
        BLOCKSTACK_GENESIS_BLOCK = 373601;


        while height >= BLOCKSTACK_GENESIS_BLOCK and len(result) < number:
            nameops = bs_client.get_nameops_at(height)
            print nameops
            print height 
            i = 0
            while i < len(nameops) and len(result) < number:
                result.append(nameops[i])
                i = i + 1
            height = height - 1


        return jsonify(result), 200
    except Exception as e:
        return jsonify(str(e)), 500

def runserver():
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)

if __name__ == '__main__':
    runserver()
