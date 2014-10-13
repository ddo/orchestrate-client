var expect = require('chai').expect;

var orchestrate = require('./../');

var o = orchestrate(process.env.ORCHESTRATE_TOKEN);

describe('#get', function() {
    it('no key', function(done) {
        o.get('user', function(err, data, header) {
            expect(err).to.be.an('null');

            expect(data).to.be.an('object');
            expect(data).to.have.property('count').that.is.a('number');
            expect(data).to.have.property('results').that.is.an('array');

            expect(header).to.be.an('object');

            done();
        });
    });

    it('random key', function(done) {
        o.get('user', parseInt(Math.random()*100, 10), function(err, header) {
            expect(err).to.be.an('object');
            expect(err).to.have.property('message').that.is.a('string');
            expect(err).to.have.property('details').that.is.an('object');
            expect(err).to.have.property('code').that.is.an('string');

            expect(header).to.be.an('object');

            done();
        });
    });

    it('opt limit', function(done) {
        o.get('user', {limit: 1}, function(err, data, header) {
            expect(err).to.be.an('null');

            expect(data).to.be.an('object');
            expect(data).to.have.property('count').that.is.a('number');
            expect(data).to.have.property('results').that.is.an('array');

            expect(header).to.be.an('object');

            done();
        });
    });

    it('opt startKey', function(done) {
        o.get('user', {
            startKey: '05b90d56dd20b9e9'
        }, function(err, data, header) {
            expect(err).to.be.an('null');

            expect(data).to.be.an('object');
            expect(data).to.have.property('count').that.is.a('number');
            expect(data).to.have.property('results').that.is.an('array');

            expect(header).to.be.an('object');

            done();
        });
    });

    it('search', function(done) {
        o.get('user', {
            query: 'game:csgo',
            sort: 'value.name:asc'
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
        o.get({
            collection: 'user',
            key: 1,
            opt: {
                query: 'game:csgo',
                sort: 'value.name:asc'
            }
        }, function(err, data, header) {
            expect(err).to.be.an('null');

            expect(data).to.be.an('object');
            expect(header).to.be.an('object');

            done();
        });
    });
});

