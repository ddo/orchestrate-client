var expect = require('chai').expect;

var orchestrate = require('./../');

var o = orchestrate(process.env.ORCHESTRATE_TOKEN);

describe('#del', function() {
    it('del 1', function(done) {
        o.del('user', 1, function(err, header) {
            expect(err).to.be.an('null');
            expect(header).to.be.an('object');

            done();
        });
    });

    it('del 1 with force true', function(done) {
        o.del('user', 1, {
            force: true
        }, function(err, header) {
            expect(err).to.be.an('null');
            expect(header).to.be.an('object');

            done();
        });
    });

    it('del all', function(done) {
        o.del('user', function(err, header) {
            expect(err).to.be.an('object');
            expect(header).to.be.an('object');

            done();
        });
    });

    it('del all with force true', function(done) {
        o.del('user', {
            force: true
        }, function(err, header) {
            expect(err).to.be.an('null');
            expect(header).to.be.an('object');

            done();
        });
    });

    it('pass collection as object', function(done) {
        o.del({
            collection: 'user',
            key: 1,
            opt: {
                force: true
            }
        }, function(err, header) {
            expect(err).to.be.an('null');
            expect(header).to.be.an('object');

            done();
        });
    });
});

