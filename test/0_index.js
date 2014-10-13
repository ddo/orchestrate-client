var expect = require('chai').expect;

var orchestrate = require('./../');

describe('#ping', function() {
    it('valid token', function(done) {
        var o = orchestrate(process.env.ORCHESTRATE_TOKEN);

        o.ping(function(err, header) {
            expect(err).to.be.a('null');
            expect(header).to.be.an('object');

            done();
        });
    });

    it('invalid token', function(done) {
        var o = orchestrate('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
        
        o.ping(function(err, header) {
            expect(err).to.be.equal('unauthorized');
            expect(header).to.be.an('object');

            done();
        });
    });
});

