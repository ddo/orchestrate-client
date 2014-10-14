var expect = require('chai').expect;

var orchestrate = require('./../');

var o = orchestrate(process.env.ORCHESTRATE_TOKEN);
var ref;

describe('ref', function() {
    describe('#get', function() {

        it('no ref', function(done) {
            o.ref.get('user', 1, function(err, header, data) {
                expect(err).to.be.an('null');

                //for following testing
                ref = data.results[0].path.ref;

                expect(data).to.be.an('object');
                expect(data).to.have.property('count').that.is.a('number');
                expect(data).to.have.property('results').that.is.an('array');

                expect(header).to.be.an('object');

                done();
            });
        });

        it('ref', function(done) {
            o.ref.get('user', 1, ref, function(err, header, data) {
                expect(err).to.be.an('null');

                expect(data).to.be.an('object');
                expect(header).to.be.an('object');

                done();
            });
        });

        it('limit opt', function(done) {
            o.ref.get('user', 1, {
                limit: 1
            }, function(err, header, data) {
                expect(err).to.be.an('null');

                expect(data).to.be.an('object');
                expect(header).to.be.an('object');

                done();
            });
        });

        it('pass collection as object', function(done) {
            o.ref.get({
                collection: 'user',
                key: 1,
                opt: {
                    limit: 1
                }
            }, function(err, header, data) {
                expect(err).to.be.an('null');

                expect(data).to.be.an('object');
                expect(header).to.be.an('object');

                done();
            });
        });
    });
});

