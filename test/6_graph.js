var expect = require('chai').expect;

var orchestrate = require('./../');

var o = orchestrate(process.env.ORCHESTRATE_TOKEN);

describe('graph', function() {
    describe('#put', function() {
        it('default', function(done) {
            o.graph.put({
                collection: 'user',
                key: 1
            }, 'like', {
                collection: 'user',
                key: 2
            }, function(err, header) {
                expect(err).to.be.an('null');

                expect(header).to.be.an('object');

                done();
            });
        });

        it('pass from as object', function(done) {
            o.graph.put({
                from: {
                    collection: 'user',
                    key: 2
                }, 
                kind: 'follow', 
                to: {
                    collection: 'user',
                    key: 1
                }
            }, function(err, header) {
                expect(err).to.be.an('null');

                expect(header).to.be.an('object');

                done();
            });
        });
    });
    
    describe('#get', function() {
        it('1 kind', function(done) {
            o.graph.get('user', 1, 'like', function(err, header, data) {
                expect(err).to.be.an('null');

                expect(data).to.be.an('object');
                expect(data).to.have.property('count').that.is.a('number');
                expect(data).to.have.property('results').that.is.an('array');

                expect(header).to.be.an('object');

                done();
            });
        });

        it('2 kinds', function(done) {
            o.graph.get('user', 1, ['like', 'follow'], function(err, header, data) {
                expect(err).to.be.an('null');

                expect(data).to.be.an('object');
                expect(data).to.have.property('count').that.is.a('number');
                expect(data).to.have.property('results').that.is.an('array');

                expect(header).to.be.an('object');

                done();
            });
        });
    
        it('limit opt', function(done) {
            o.graph.get('user', 1, ['like', 'follow'], {
                limit: 1
            }, function(err, header, data) {
                expect(err).to.be.an('null');

                expect(data).to.be.an('object');
                expect(data).to.have.property('count').that.is.a('number');
                expect(data).to.have.property('results').that.is.an('array');

                expect(header).to.be.an('object');

                done();
            });
        });

        it('pass from as object', function(done) {
            o.graph.get({
                collection: 'user',
                key: 2,
                kind: ['like', 'follow']
            }, function(err, header, data) {
                expect(err).to.be.an('null');

                expect(data).to.be.an('object');
                expect(data).to.have.property('count').that.is.a('number');
                expect(data).to.have.property('results').that.is.an('array');

                expect(header).to.be.an('object');

                done();
            });
        });
    });

    describe('#del', function() {
        it('purge opt', function(done) {
            o.graph.del({
                collection: 'user',
                key: 1
            }, 'like', {
                collection: 'user',
                key: 2
            }, {
                purge: true
            }, function(err, header) {
                expect(err).to.be.an('null');

                expect(header).to.be.an('object');

                done();
            });
        });

        it('pass collection as object', function(done) {
            o.graph.del({
                from: {
                    collection: 'user',
                    key: 1
                }, 
                kind: 'like', 
                to: {
                    collection: 'user',
                    key: 2
                },
                opt: {
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
