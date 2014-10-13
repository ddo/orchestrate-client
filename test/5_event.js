var expect = require('chai').expect;

var orchestrate = require('./../');

var o = orchestrate(process.env.ORCHESTRATE_TOKEN);
var timestamp, timestamp2, ordinal, ordinal2;

describe('event', function() {
    describe('#post', function() {
        it('no data', function(done) {
            o.event.post('user', 1, 'login', function(err, header) {
                expect(err).to.be.an('null');

                expect(header).to.be.an('object');

                done();
            });
        });

        it('data', function(done) {
            o.event.post('user', 1, 'login', {
                ip: '1.1.1.1'
            }, function(err, header) {
                expect(err).to.be.an('null');

                expect(header).to.be.an('object');

                done();
            });
        });

        it('timestamp', function(done) {
            o.event.post('user', 1, 'login', (new Date()).getTime(), function(err, header) {
                expect(err).to.be.an('null');

                expect(header).to.be.an('object');

                done();
            });
        });

        it('timestamp & data', function(done) {
            o.event.post('user', 1, 'login', (new Date()).getTime(), {
                login: '2.2.2.2'
            }, function(err, header) {
                expect(err).to.be.an('null');

                expect(header).to.be.an('object');

                done();
            });
        });
    });
    
    describe('#get', function() {
        it('no timestamp & ordinal', function(done) {
            o.event.get('user', 1, 'login', function(err, data, header) {
                expect(err).to.be.an('null');

                //for following testing
                timestamp  = data.results[0].path.timestamp;
                ordinal    = data.results[0].path.ordinal_str;
                timestamp2 = data.results[1].path.timestamp;
                ordinal2   = data.results[1].path.ordinal_str;

                expect(data).to.be.an('object');
                expect(data).to.have.property('count').that.is.a('number');
                expect(data).to.have.property('results').that.is.an('array');

                expect(header).to.be.an('object');

                done();
            });
        });

        it('timestamp', function(done) {
            o.event.get('user', '1', 'login', {
                timestamp: timestamp
            }, function(err, data, header) {
                expect(err).to.be.an('null');

                expect(data).to.be.an('object');
                expect(data).to.have.property('count').that.is.a('number');
                expect(data).to.have.property('results').that.is.an('array');

                expect(header).to.be.an('object');

                done();
            });
        });

        it('timestamp & ordinal', function(done) {
            o.event.get('user', '1', 'login', {
                timestamp: timestamp,
                ordinal: ordinal
            }, function(err, data, header) {
                expect(err).to.be.an('null');

                expect(data).to.be.an('object');
                expect(header).to.be.an('object');

                done();
            });
        });

        it('limit opt', function(done) {
            o.event.get('user', '1', 'login', {
                limit: 1
            }, function(err, data, header) {
                expect(err).to.be.an('null');

                expect(data).to.be.an('object');
                expect(data).to.have.property('count').that.is.a('number');
                expect(data).to.have.property('results').that.is.an('array');

                expect(header).to.be.an('object');

                done();
            });
        });

        it('pass collection as object', function(done) {
            o.event.get({
                collection: 'user',
                key: 1, 
                type: 'login',
                opt: {
                    timestamp: timestamp,
                    limit: 1
                }
            }, function(err, data, header) {
                expect(err).to.be.an('null');

                expect(data).to.be.an('object');
                expect(data).to.have.property('count').that.is.a('number');
                expect(data).to.have.property('results').that.is.an('array');

                expect(header).to.be.an('object');

                done();
            });
        });
    });

    describe('#put', function() {
        it('no data', function(done) {
            o.event.put('user', 1, 'login', {
                timestamp: timestamp,
                ordinal: ordinal
            }, function(err, header) {
                expect(err).to.be.an('null');

                expect(header).to.be.an('object');

                done();
            });
        });

        it('data', function(done) {
            o.event.put('user', 1, 'login', {
                timestamp: timestamp,
                ordinal: ordinal
            }, {
                ip: '3.3.3.3'
            }, function(err, header) {
                expect(err).to.be.an('null');

                expect(header).to.be.an('object');

                done();
            });
        });

        it('pass collection as object', function(done) {
            o.event.put({
                collection: 'user',
                key: 1,
                type: 'login',
                timestamp: timestamp,
                ordinal: ordinal,
                data: {
                    ip: '4.4.4.4'
                }
            }, function(err, header) {
                expect(err).to.be.an('null');

                expect(header).to.be.an('object');

                done();
            });
        });
    });

    describe('#del', function() {
        it('timestamp & ordinal', function(done) {
            o.event.del('user', '1', 'login', {
                timestamp: timestamp,
                ordinal: ordinal,
                purge: true
            }, function(err, header) {
                expect(err).to.be.an('null');

                expect(header).to.be.an('object');

                done();
            });
        });

        it('pass collection as object', function(done) {
            o.event.del({
                collection: 'user',
                key: 1, 
                type: 'login',
                opt: {
                    timestamp: timestamp2,
                    ordinal: ordinal2,
                    purge: true
                }
            }, function(err, header) {
                expect(err).to.be.an('null');

                expect(header).to.be.an('object');

                done();
            });
        });
    });
});
