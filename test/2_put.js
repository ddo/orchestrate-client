var expect = require('chai').expect;

var orchestrate = require('./../');

var o = orchestrate(process.env.ORCHESTRATE_TOKEN);

describe('#put', function() {
    it('create', function(done) {
        o.put('user', '1', {
            name: 'ddooooooo',
            age: 25,
            game: 'csgo, dota, minecraft'
        }, function(err, header) {
            expect(err).to.be.an('null');
            expect(header).to.be.an('object');

            done();
        });
    });

    it('update', function(done) {
        o.put('user', 1, {
            name: 'ddo3',
            age: 25
        }, function(err, header) {
            expect(err).to.be.an('null');
            expect(header).to.be.an('object');

            done();
        });
    });

    it('pass collection as object', function(done) {
        o.put({
            collection: 'user',
            key: 2,
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

