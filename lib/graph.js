var path = require('path');

var debug = require('debug')('orchestrate:graph');
var arg   = require('fn-arg');

module.exports = Graph;

function Graph(orchestrate) {
    if(!(this instanceof Graph)) {
        return new Graph(orchestrate);
    }

    this.orchestrate = orchestrate;

    return this;
}

Graph.prototype.get = function(collection, key, kind, opt, callback) {
    var self = this.orchestrate;

    debug('#get');

    /////////////////// optional params handler /////////////////
    var args = arg({
        2: ['collection', 'callback'],
        4: ['collection', 'key', 'kind', 'callback'],
        5: ['collection', 'key', 'kind', 'opt', 'callback']
    });

    if(!args) {
        throw new Error('invalid params');
    }

    collection = args.collection;
    key        = args.key;
    kind       = args.kind;
    opt        = args.opt;
    callback   = args.callback;

    switch(Object.keys(args).length) {
        case 2:
            if(typeof args.collection === 'object') {
                collection = args.collection.collection;
                key        = args.collection.key;
                kind       = args.collection.kind;
                opt        = args.collection.opt;
            }
            break;

        default:
            break;
    }

    if(typeof kind === 'object') {
        kind = kind.join('/');
    }

    collection = collection ? collection + '' : collection;
    key        = key ? key + '' : '';
    kind       = kind ? kind + '' : '';
    opt        = opt ? opt : {};
    /////////////////// optional params handler /////////////////

    if(!collection || !key || !kind) {
        throw new Error('invalid params');
    }

    var suffix = path.join('relations', kind);

    var uri = self._makeUri(collection, key, suffix);

    self._request(uri, {
        qs: opt
    }, function(err, res, body) {
        if(err) {
            debug('#get error', err);
            return callback(err);
        }

        if(res.statusCode !== 200) {
            debug('#get error', body, res.headers);
            return callback(body, res.headers);
        }

        debug('#get success');

        return callback(null, res.headers, body);
    });
};

Graph.prototype.put = function(from, kind, to, callback) {
    var self = this.orchestrate;

    debug('#put');

    /////////////////// optional params handler /////////////////
    var args = arg({
        2: ['from', 'callback'],
        4: ['from', 'kind', 'to', 'callback']
    });

    if(!args) {
        throw new Error('invalid params');
    }

    from     = args.from;
    to       = args.to;
    kind     = args.kind;
    callback = args.callback;

    switch(Object.keys(args).length) {
        case 2:
            if(typeof args.from === 'object') {
                from = args.from.from;
                to   = args.from.to;
                kind = args.from.kind;
            }
            break;

        default:
            break;
    }

    collection    = from.collection ? from.collection + '' : '';
    key           = from.key ? from.key + '' : '';
    to_collection = to.collection ? to.collection + '' : '';
    to_key        = to.key ? to.key + '' : '';
    kind          = kind ? kind + '' : '';
    /////////////////// optional params handler /////////////////

    if(!collection || !key || !kind || !to_collection || !to_key) {
        throw new Error('invalid params');
    }

    var suffix = path.join('relation', kind, to_collection, to_key);

    var uri = self._makeUri(collection, key, suffix);

    self._request(uri, {
        method: 'PUT'
    }, function(err, res, body) {
        if(err) {
            debug('#put error', err);
            return callback(err);
        }

        if(res.statusCode !== 204) {
            debug('#put error', body, res.headers);
            return callback(body, res.headers);
        }

        debug('#put success');

        return callback(null, res.headers);
    });
};

Graph.prototype.del = function(from, kind, to, opt, callback) {
    var self = this.orchestrate;

    debug('#del');

    /////////////////// optional params handler /////////////////
    var args = arg({
        2: ['from', 'callback'],
        4: ['from', 'kind', 'to', 'callback'],
        5: ['from', 'kind', 'to', 'opt', 'callback']
    });

    if(!args) {
        throw new Error('invalid params');
    }

    from     = args.from;
    to       = args.to;
    kind     = args.kind;
    opt      = args.opt;
    callback = args.callback;

    switch(Object.keys(args).length) {
        case 2:
            if(typeof args.from === 'object') {
                from = args.from.from;
                to   = args.from.to;
                kind = args.from.kind;
                opt  = args.from.opt;
            }
            break;

        default:
            break;
    }

    collection    = from.collection ? from.collection + '' : '';
    key           = from.key ? from.key + '' : '';
    to_collection = to.collection ? to.collection + '' : '';
    to_key        = to.key ? to.key + '' : '';
    kind          = kind ? kind + '' : '';
    opt           = opt ? opt : {};
    /////////////////// optional params handler /////////////////

    if(!collection || !key || !kind || !to_collection || !to_key) {
        throw new Error('invalid params');
    }

    var suffix = path.join('relation', kind, to_collection, to_key);

    var uri = self._makeUri(collection, key, suffix);

    self._request(uri, {
        method: 'DELETE',
        qs: opt
    }, function(err, res, body) {
        if(err) {
            debug('#del error', err);
            return callback(err);
        }

        if(res.statusCode !== 204) {
            debug('#del error', body, res.headers);
            return callback(body, res.headers);
        }

        debug('#del success');

        return callback(null, res.headers);
    });
};
