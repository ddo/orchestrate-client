var expect = require('chai').expect;

var orchestrate = require('./../');

var o = orchestrate(process.env.ORCHESTRATE_TOKEN);

describe('#post', function() {
    it('data', function(done) {
        o.post('user', {
            name: 'ddo',
            age: 25,
            game: 'csgo, dota'
        }, function(err, header) {
            expect(err).to.be.an('null');
            expect(header).to.be.an('object');

            done();
        });
    });

    it('no data', function(done) {
        o.post('user', function(err, header) {
            expect(err).to.be.an('null');
            expect(header).to.be.an('object');

            done();
        });
    });

    it('pass collection as object', function(done) {
        o.post({
            collection: 'user',
            data: {
                name: 'ddo2',
                age: 25,
                game: 'csgo, dota'
            }
        }, function(err, header) {
            expect(err).to.be.an('null');
            expect(header).to.be.an('object');

            done();
        });
    });
});

