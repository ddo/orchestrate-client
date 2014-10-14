var path = require('path');

var debug = require('debug')('orchestrate:event');
var arg   = require('fn-arg');

module.exports = Event;

function Event(orchestrate) {
    if(!(this instanceof Event)) {
        return new Event(orchestrate);
    }

    this.orchestrate = orchestrate;

    return this;
}

Event.prototype.get = function(collection, key, type, opt, callback) {
    var self = this.orchestrate;

    debug('#get');

    var timestamp = '';
    var ordinal = '';

    /////////////////// optional params handler /////////////////
    var args = arg({
        2: ['collection', 'callback'],
        4: ['collection', 'key', 'type', 'callback'],
        5: ['collection', 'key', 'type', 'opt', 'callback']
    });

    if(!args) {
        throw new Error('invalid params');
    }

    collection = args.collection;
    key        = args.key;
    type       = args.type;
    opt        = args.opt;
    callback   = args.callback;

    switch(Object.keys(args).length) {
        case 2:
            if(typeof args.collection === 'object') {
                collection = args.collection.collection;
                key        = args.collection.key;
                type       = args.collection.type;
                opt        = args.collection.opt;

                if(opt) {
                    timestamp = opt.timestamp;
                    ordinal = opt.ordinal;

                    delete opt.timestamp;
                    delete opt.ordinal;
                }
            }
            break;

        case 5:
            if(opt) {
                timestamp = opt.timestamp;
                ordinal = opt.ordinal;

                delete opt.timestamp;
                delete opt.ordinal;
            }
            break;

        default:
            break;
    }

    collection = collection ? collection + '' : collection;
    key        = key ? key + '' : '';
    type       = type ? type + '' : '';
    timestamp  = timestamp ? timestamp + '' : '';
    ordinal    = ordinal ? ordinal + '' : '';
    opt        = opt ? opt : {};
    /////////////////// optional params handler /////////////////

    if(!collection || !key || !type) {
        throw new Error('invalid params');
    }

    var suffix = path.join('events', type, timestamp, ordinal);

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

Event.prototype.post = function(collection, key, type, timestamp, data, callback) {
    var self = this.orchestrate;

    debug('#post');

    /////////////////// optional params handler /////////////////
    var args = arg({
        2: ['collection', 'callback'],
        4: ['collection', 'key', 'type', 'callback'],
        5: ['collection', 'key', 'type', 'timestamp', 'callback'],
        6: ['collection', 'key', 'type', 'timestamp', 'data', 'callback']
    });

    if(!args) {
        throw new Error('invalid params');
    }

    collection = args.collection;
    key        = args.key;
    type       = args.type;
    timestamp  = args.timestamp;
    data       = args.data;
    callback   = args.callback;

    switch(Object.keys(args).length) {
        case 2:
            if(typeof args.collection === 'object') {
                collection = args.collection.collection;
                key        = args.collection.key;
                type       = args.collection.type;
                timestamp  = args.collection.timestamp;
                data       = args.collection.data;
            }
            break;

        case 5:
            if(typeof args.timestamp === 'object') {
                data = timestamp;
                timestamp = null;
            }
            break;

        default:
            break;
    }

    collection = collection ? collection + '' : collection;
    key        = key ? key + '' : '';
    type       = type ? type + '' : '';
    timestamp  = timestamp ? timestamp + '' : '';
    data       = data ? data : {};
    /////////////////// optional params handler /////////////////

    if(!collection || !key || !type) {
        throw new Error('invalid params');
    }

    var suffix = path.join('events', type, timestamp);

    var uri = self._makeUri(collection, key, suffix);

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

//timestamp and ordinal r required
Event.prototype.del = function(collection, key, type, opt, callback) {
    var self = this.orchestrate;

    debug('#del');

    var timestamp = '';
    var ordinal = '';

    /////////////////// optional params handler /////////////////
    var args = arg({
        2: ['collection', 'callback'],
        4: ['collection', 'key', 'type', 'callback'],
        5: ['collection', 'key', 'type', 'opt', 'callback']
    });

    if(!args) {
        throw new Error('invalid params');
    }

    collection = args.collection;
    key        = args.key;
    type       = args.type;
    opt        = args.opt;
    callback   = args.callback;

    switch(Object.keys(args).length) {
        case 2:
            if(typeof args.collection === 'object') {
                collection = args.collection.collection;
                key        = args.collection.key;
                type       = args.collection.type;
                opt        = args.collection.opt;

                if(opt) {
                    timestamp = opt.timestamp;
                    ordinal = opt.ordinal;

                    delete opt.timestamp;
                    delete opt.ordinal;
                }
            }
            break;

        case 5:
            if(opt) {
                timestamp = opt.timestamp;
                ordinal = opt.ordinal;

                delete opt.timestamp;
                delete opt.ordinal;
            }
            break;

        default:
            break;
    }

    collection = collection ? collection + '' : collection;
    key        = key ? key + '' : '';
    type       = type ? type + '' : '';
    timestamp  = timestamp ? timestamp + '' : '';
    ordinal    = ordinal ? ordinal + '' : '';
    opt        = opt ? opt : {};
    /////////////////// optional params handler /////////////////

    if(!collection || !key || !type || !timestamp || !ordinal) {
        throw new Error('invalid params');
    }

    var suffix = path.join('events', type, timestamp, ordinal);

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

//timestamp and ordinal r required
Event.prototype.put = function(collection, key, type, opt, data, callback) {
    var self = this.orchestrate;

    debug('#put');

    var timestamp, ordinal;

    /////////////////// optional params handler /////////////////
    var args = arg({
        2: ['collection', 'callback'],
        5: ['collection', 'key', 'type', 'opt', 'callback'],
        6: ['collection', 'key', 'type', 'opt', 'data', 'callback']
    });

    if(!args) {
        throw new Error('invalid params');
    }

    collection = args.collection;
    key        = args.key;
    type       = args.type;
    opt        = args.opt;
    data       = args.data;
    callback   = args.callback;

    switch(Object.keys(args).length) {
        case 2:
            if(typeof args.collection === 'object') {
                collection = args.collection.collection;
                key        = args.collection.key;
                type       = args.collection.type;
                timestamp  = args.collection.timestamp;
                ordinal    = args.collection.ordinal;
                data       = args.collection.data;
            }
            break;

        case 5:
            collection = args.collection;
            key        = args.key;
            timestamp  = args.opt.timestamp;
            ordinal    = args.opt.ordinal;
            break;

        case 6:
            collection = args.collection;
            key        = args.key;
            timestamp  = args.opt.timestamp;
            ordinal    = args.opt.ordinal;
            data       = args.data;
            break;

        default:
            break;
    }

    collection = collection ? collection + '' : collection;
    key        = key ? key + '' : '';
    type       = type ? type + '' : '';
    timestamp  = timestamp ? timestamp + '' : '';
    ordinal    = ordinal ? ordinal + '' : '';
    data       = data ? data : {};
    /////////////////// optional params handler /////////////////

    if(!collection || !key || !type || !timestamp || !ordinal) {
        throw new Error('invalid params');
    }

    var suffix = path.join('events', type, timestamp, ordinal);

    var uri = self._makeUri(collection, key, suffix);

    self._request(uri, {
        method: 'PUT',
        body: data
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