var path = require('path');

var debug = require('debug')('orchestrate:ref');
var arg   = require('fn-arg');

module.exports = Ref;

function Ref(orchestrate) {
    if(!(this instanceof Ref)) {
        return new Ref(orchestrate);
    }

    this.orchestrate = orchestrate;

    return this;
}

Ref.prototype.get = function(collection, key, opt, callback) {
    var self = this.orchestrate;

    debug('#get');

    var ref = '';

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
                ref        = args.collection.ref;
                opt        = args.collection.opt;
            }
            break;

        case 4:
            if(typeof args.opt === 'string') {
                ref = args.opt;
                opt = null;
            }
            break;

        default:
            break;
    }

    collection = collection ? collection + '' : collection;
    key        = key ? key + '' : '';
    ref        = ref ? ref + '' : '';
    opt        = opt ? opt : {};
    /////////////////// optional params handler /////////////////

    if(!collection || !key) {
        throw new Error('invalid params');
    }

    var suffix = path.join('refs', ref);

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

        return callback(null, body, res.headers);
    });
};