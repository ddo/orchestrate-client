var orchestrate = require('./');

var o = orchestrate(process.env.ORCHESTRATE_TOKEN);

// o.ping(function(err, header) {
//     console.log(err);
//     console.log(header);
// });

// o.get('user', function(err, data, header) {
//     console.log(err);
//     console.log(data);
//     console.log(header);
// });

// o.get('user', 1, function(err, data, header) {
//     console.log(err);
//     console.log(data);
//     console.log(header);
// });

// o.get('user', {limit: 1}, function(err, data, header) {
//     console.log(err);
//     console.log(data);
//     console.log(header);
// });

// o.get('user', {
//     startKey: '05b90d56dd20b9e9'
// }, function(err, data, header) {
//     console.log(err);
//     console.log(data);
//     console.log(header);
// });

//search
// o.get('user', {
//     query: 'game:csgo',
//     sort: 'value.name:asc'
// }, function(err, data, header) {
//     console.log(err);
//     console.log(data);
//     console.log(header);
// });

// o.get({
//     collection: 'user',
//     key: '05b917209320bd4a',
//     opt: {
//         query: 'game:csgo',
//         sort: 'value.name:asc'
//     }
// }, function(err, data, header) {
//     console.log(err);
//     console.log(data);
//     console.log(header);
// });

//post   
// o.post('user', {
//     name: 'ddo',
//     age: 25,
//     game: 'csgo, dota'
// }, function(err, header) {
//     console.log(err);
//     console.log(header);
// });

// o.post('user', function(err, header) {
//     console.log(err);
//     console.log(header);
// });

// o.del('user', 1, function(err, header) {
//     console.log(err);
//     console.log(header);
// });

// o.del('user', '05b8af95d6206eec', {
//     force: true
// }, function(err, header) {
//     console.log(err);
//     console.log(header);
// });

// o.del('user', function(err, header) {
//     console.log(err);
//     console.log(header);
// });

// o.del('user', {
//     force: true
// }, function(err, header) {
//     console.log(err);
//     console.log(header);
// });

// o.put('user', '05b917209320bd4a', {
//     name: 'ddooooooo',
//     age: 25,
//     game: 'csgo, dota, minecraft'
// }, function(err, header) {
//     console.log(err);
//     console.log(header);
// });

// o.put('user', 4, {
//     name: 'ddoooo',
//     age: 26
// }, function(err, header) {
//     console.log(err);
//     console.log(header);
// });

//ref
// o.ref.get('user', '05b917209320bd4a', 'c705665f84eb724c', function(err, data, header) {
//     console.log(err);
//     console.log(data);
//     console.log(header);
// });

// o.ref.get('user', '05b917209320bd4a', function(err, data, header) {
//     console.log(err);
//     console.log(data);
//     console.log(header);
// });

// o.ref.get('user', '05b917209320bd4a', {
//     limit: 1
// }, function(err, data, header) {
//     console.log(err);
//     console.log(data);
//     console.log(header);
// });

//event
// o.event.get('user', '05b917209320bd4a', 'login', function(err, data, header) {
//     console.log(err);
//     console.log(data);
//     console.log(header);
// });

// o.event.get('user', '05b917209320bd4a', {
//     type: 'login',
//     timestamp: 1413125468732,
//     // ordinal: '412569671788163100'
// }, function(err, data, header) {
//     console.log(err);
//     console.log(data);
//     console.log(header);
// });

// o.event.post('user', '05b917209320bd4a', 'login', function(err, header) {
//     console.log(err);
//     console.log(header);
// });

// o.event.post('user', '05b917209320bd4a', 'login', {
//     ip: '3.3.3.3'
// }, function(err, header) {
//     console.log(err);
//     console.log(header);
// });