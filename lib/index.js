var path = require('path');

var request = require('request');
var debug   = require('debug')('orchestrate');
var arg     = require('fn-arg');

var packagefile = require('./../package.json');

var Ref = require('./ref');
var Event = require('./Event');

module.exports = Orchestrate;

function Orchestrate(token) {
    if(!(this instanceof Orchestrate)) {
        return new Orchestrate(token);
    }

    if(!token) {
        throw new Error('invalid token');
    }

    this.version = packagefile.version;
    this.token   = token;

    this.orchestrate_verion = 0;
    this.orchestrate_url    = 'https://api.orchestrate.io/';

    debug('#init', this);

    this.ref   = Ref(this);
    this.event = Event(this);

    return this;
}

Orchestrate.prototype._request = function(url, opt, callback) {
    var self = this;

    opt = opt || {};

    opt.url = self.orchestrate_url + path.join('v' + self.orchestrate_verion, url || '/');

    opt.json = true;

    opt.auth = {
        user: self.token
    };

    opt.headers = {
        'User-Agent': 'orchestrate-native v' + self.version
    };

    debug('#_request', opt);

    request(opt, callback);
};

Orchestrate.prototype._makeUri = function(collection, key, suffix) {
    var self = this;

    debug('#_makeUri');

    return path.join(collection, key, suffix || '');
};

Orchestrate.prototype.ping = function(callback) {
    var self = this;

    debug('#ping');

    self._request(null, {
        method: 'HEAD'
    }, function(err, res, body) {
        if(err) {
            debug('#ping error', err);
            return callback(err);
        }

        if(res.statusCode !== 200) {
            debug('#ping error', res.headers);
            return callback('unauthorized', res.headers);
        }

        debug('#ping success');

        return callback(null, res.headers);
    });
};

Orchestrate.prototype.get = function(collection, key, opt, callback) {
    var self = this;

    debug('#get');

    /////////////////// optional params handler /////////////////
    var args = arg({
        2: ['collection', 'callback'],
        3: ['collection', 'key', 'callback'],
        4: ['collection', 'key', 'opt', 'callback']
    });

    if(!args) {
        throw new Error('invalid params');
    }

    collection = args.collection;
    key        = args.key;
    opt        = args.opt;
    callback   = args.callback;

    switch(Object.keys(args).length) {
        case 2:
            if(typeof args.collection === 'object') {
                collection = args.collection.collection;
                key        = args.collection.key;
                opt        = args.collection.opt;
                callback   = args.callback;
            }
            break;

        case 3:
            if(typeof args.key === 'object') {
                collection = args.collection;
                key        = null;
                opt        = args.key;
                callback   = args.callback;
            }
            break;

        default:
            break;
    }

    collection = collection ? collection + '' : collection;
    key        = key ? key + '' : '';
    opt        = opt ? opt : {};
    /////////////////// optional params handler /////////////////

    if(!collection || !callback) {
        throw new Error('invalid params');
    }

    var uri = self._makeUri(collection, key);

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

Orchestrate.prototype.post = function(collection, data, callback) {
    var self = this;

    debug('#post');

    /////////////////// optional params handler /////////////////
    var args = arg({
        2: ['collection', 'callback'],
        3: ['collection', 'data', 'callback']
    });

    if(!args) {
        throw new Error('invalid params');
    }

    collection = args.collection;
    data       = args.data;
    callback   = args.callback;

    switch(Object.keys(args).length) {
        case 2:
            if(typeof args.collection === 'object') {
                collection = args.collection.collection;
                data       = args.collection.data;
                callback   = args.callback;
            }
            break;

        default:
            break;
    }

    collection = collection ? collection + '' : collection;
    data       = data ? data : {};
    /////////////////// optional params handler /////////////////

    if(!collection) {
        throw new Error('invalid params');
    }

    var uri = collection;

    self._request(uri, {
        method: 'POST',
        body: data
    }, function(err, res, body) {
        if(err) {
            debug('#post error', err);
            return callback(err);
        }

        if(res.statusCode !== 201) {
            debug('#post error', body, res.headers);
            return callback(body, res.headers);
        }

        debug('#post success');

        return callback(null, res.headers);
    });
};

Orchestrate.prototype.put = function(collection, key, data, callback) {
    var self = this;

    debug('#put');

    /////////////////// optional params handler /////////////////
    var args = arg({
        2: ['collection', 'callback'],
        3: ['collection', 'key', 'callback'],
        4: ['collection', 'key', 'data', 'callback']
    });

    if(!args) {
        throw new Error('invalid params');
    }

    collection = args.collection;
    key        = args.key;
    data       = args.data;
    callback   = args.callback;

    switch(Object.keys(args).length) {
        case 2:
            if(typeof args.collection === 'object') {
                collection = args.collection.collection;
                key        = args.collection.key;
                data       = args.collection.data;
                callback   = args.callback;
            }
            break;

        case 3:
            if(typeof args.key === 'object') {
                collection = args.collection;
                key        = null;
                data       = args.key;
                callback   = args.callback;
            }
            break;

        default:
            break;
    }

    collection = collection ? collection + '' : collection;
    key        = key ? key + '' : key;
    data       = data ? data : {};
    /////////////////// optional params handler /////////////////

    if(!collection || !key) {
        throw new Error('invalid params');
    }

    var uri = path.join(collection, key);

    self._request(uri, {
        method: 'PUT',
        body: data
    }, function(err, res, body) {
        if(err) {
            debug('#put error', err);
            return callback(err);
        }

        if(res.statusCode !== 201) {
            debug('#put error', body || res.statusCode, res.headers);
            return callback(body || res.statusCode, res.headers);
        }

        debug('#put success');

        return callback(null, res.headers);
    });
};

Orchestrate.prototype.del = function(collection, key, opt, callback) {
    var self = this;

    debug('#del');

    /////////////////// optional params handler /////////////////
    var args = arg({
        2: ['collection', 'callback'],
        3: ['collection', 'key', 'callback'],
        4: ['collection', 'key', 'opt', 'callback']
    });

    if(!args) {
        throw new Error('invalid params');
    }

    collection = args.collection;
    key        = args.key;
    opt        = args.opt;
    callback   = args.callback;

    switch(Object.keys(args).length) {
        case 2:
            if(typeof args.collection === 'object') {
                collection = args.collection.collection;
                key        = args.collection.key;
                opt        = args.collection.opt;
                callback   = args.callback;
            }
            break;

        case 3:
            if(typeof args.key === 'object') {
                collection = args.collection;
                key        = null;
                opt        = args.key;
                callback   = args.callback;
            }
            break;

        default:
            break;
    }

    collection = collection ? collection + '' : collection;
    key        = key ? key + '' : '';
    opt        = opt ? opt : {};
    /////////////////// optional params handler /////////////////

    if(!collection) {
        throw new Error('invalid params');
    }

    var uri = path.join(collection, key);

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