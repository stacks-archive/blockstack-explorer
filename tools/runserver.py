#!/usr/bin/env python
# -*- coding: utf-8 -*-

import math
import os

from flask import Flask, jsonify
from flask_crossdomain import crossdomain

from blockstack_client import client as bs_client
import blockstack_client
session = bs_client.session(server_host="localhost", server_port=6264, set_global=True)

app = Flask(__name__)

@app.route('/get_all_namespaces', methods=['GET'])
@crossdomain(origin='*')
def get_all_namespaces():
    try:
        namespaces = session.get_all_namespaces()
        return jsonify(namespaces), 200, {'Cache-Control': 'public, max-age=300'}
    except Exception as e:
        return jsonify(str(e)), 500


@app.route('/get_name_blockchain_history/<fqu>', methods=['GET'])
@crossdomain(origin='*')
def get_name_blockchain_history(fqu):
    try:

        info = bs_client.getinfo()
        height = int(info["last_block_processed"])
        start_block = 0
        end_block = height
        blockchain_history = bs_client.get_name_blockchain_history(fqu, start_block, end_block)
        if blockchain_history == {}:
            return jsonify({'error': 'Not found'}), 404, {'Cache-Control': 'public, max-age=300'}
        else:
            return jsonify(blockchain_history), 200, {'Cache-Control': 'public, max-age=300'}
    except Exception as e:
        return jsonify(str(e)), 500

@app.route('/get_names_in_namespace/<namespace>/<page_num>', methods=['GET'])
@crossdomain(origin='*')
def get_names_in_namespace(namespace, page_num):
    try:
        NAMES_PER_PAGE = 50

        offset = int(page_num) * NAMES_PER_PAGE
        count = NAMES_PER_PAGE

        reply = {}
        reply['names'] = bs_client.get_names_in_namespace(namespace, offset, count)
        reply['total_pages'] = int(math.ceil(bs_client.get_num_names_in_namespace(namespace) / float(NAMES_PER_PAGE)))
        return jsonify(reply), 200, {'Cache-Control': 'public, max-age=300'}
    except Exception as e:
        return jsonify(str(e)), 500

@app.route('/get_names_owned_by_address/<address>', methods=['GET'])
@crossdomain(origin='*')
def get_names_owned_by_address(address):
    try:
        reply = {}
        reply['names'] = blockstack_client.profile.get_names_owned_by_address(address)
        return jsonify(reply), 200, {'Cache-Control': 'public, max-age=300'}
    except Exception as e:
        return jsonify(str(e)), 500

@app.route('/get_name_zonefile/<fqu>', methods=['GET'])
@crossdomain(origin='*')
def get_name_zonefile(fqu):
    try:
        zonefile = blockstack_client.profile.get_name_zonefile(fqu)
        return jsonify(zonefile), 200, {'Cache-Control': 'public, max-age=300'}
    except Exception as e:
        return jsonify(str(e)), 500

@app.route('/get_nameops_at/<blocknum>', methods=['GET'])
@crossdomain(origin='*')
def get_nameops_at(blocknum):
    try:
        nameops = {}
        info = bs_client.getinfo()
        height = int(info["last_block_processed"])

        # block has yet to be processed by blockstack core
        if height < int(blocknum):
            return jsonify([]), 404, {'Cache-Control': 'public, max-age=10'}


        nameops["nameops"] = bs_client.get_nameops_at(int(blocknum))

        # get_nameops_at is very expensive for blocks with many ops
        # and results never change (blockchains! yay!) so cache for 1 year
        return jsonify(nameops), 200, {'Cache-Control': 'public, max-age=31536000'}
    except Exception as e:
        return jsonify(str(e)), 500

@app.route('/get_namespace_blockchain_record/<id>', methods=['GET'])
@crossdomain(origin='*')
def get_namespace_blockchain_record(id):
    try:
        blockchain_record = bs_client.get_namespace_blockchain_record(id)
        if blockchain_record == {}:
            return jsonify(blockchain_record), 404, {'Cache-Control': 'public, max-age=300'}
        else:
            return jsonify(blockchain_record), 200, {'Cache-Control': 'public, max-age=300'}
    except Exception as e:
        return jsonify(str(e)), 500

@app.route('/get_num_names_in_namespace/<id>', methods=['GET'])
@crossdomain(origin='*')
def get_num_names_in_namespace(id):
    try:
        reply = {}
        reply["count"] = bs_client.get_num_names_in_namespace(id)
        return jsonify(reply), 200, {'Cache-Control': 'public, max-age=300'}
    except Exception as e:
        return jsonify(str(e)), 500

@app.route('/getinfo', methods=['GET'])
@crossdomain(origin='*')
def ping():
    try:
        result = bs_client.getinfo()
        return jsonify(result), 200, {'Cache-Control': 'public, max-age=60'}
    except Exception as e:
        return jsonify(str(e)), 500

def runserver():
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port,threaded=True)

if __name__ == '__main__':
    runserver()
