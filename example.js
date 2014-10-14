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
//     key: '1',
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

// o.put('user', 2, {
//     name: 'ddooooooo',
//     age: 25,
//     game: 'csgo, dota, minecraftttt'
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
// o.ref.get('user', '05beb8ab4a20d872', 'c2844598ec6d42fc', function(err, data, header) {
//     console.log(err);
//     console.log(data);
//     console.log(header);
// });

// o.ref.get('user', '05beb8ab4a20d872', function(err, data, header) {
//     console.log(err);
//     console.log(data);
//     console.log(header);
// });

// o.ref.get('user', '05beb8ab4a20d872', {
//     limit: 1
// }, function(err, data, header) {
//     console.log(err);
//     console.log(data);
//     console.log(header);
// });

// o.ref.get({
//     collection: 'user',
//     key: '05beb8ab4a20d872',
//     opt: {
//         limit: 1
//     }
// }, function(err, data, header) {
//     console.log(err);
//     console.log(data);
//     console.log(header);
// });

//event
// o.event.get('user', '1', 'login', function(err, data, header) {
//     console.log(err);
//     console.log(data);
//     console.log(header);
// });

// o.event.get('user', '1', 'login', {
//     // timestamp: 1413215674842,
//     // ordinal: '05bf1e5dda086000',
//     limit: 1
// }, function(err, data, header) {
//     console.log(err);
//     console.log(data);
//     console.log(header);
// });

// o.event.get({
//     collection: 'user',
//     key: 1, 
//     type: 'login',
//     opt: {
//         // timestamp: 1413211094000,
//         limit: 1
//     }
// }, function(err, data, header) {
//     console.log(err);
//     console.log(data);
//     console.log(header);
// });

// o.event.post('user', 1, 'login', function(err, header) {
//     console.log(err);
//     console.log(header);
// });

// o.event.post('user', 1, 'login', {
//     ip: '3.3.3.3'
// }, function(err, header) {
//     console.log(err);
//     console.log(header);
// });

// o.event.post('user', 1, 'login', (new Date()).getTime(), function(err, header) {
//     console.log(err);
//     console.log(header);
// });

// o.event.post('user', 1, 'login', (new Date()).getTime(), {
//     login: '4.4.4.4'
// }, function(err, header) {
//     console.log(err);
//     console.log(header);
// });

// o.event.del('user', '1', 'login', function(err, data, header) {
//     console.log(err);
//     console.log(data);
//     console.log(header);
// });

// o.event.del('user', '1', 'login', {
//     timestamp: 1413211094000,
//     ordinal: '05bed877f0086000',
//     purge: true
// }, function(err, header) {
//     console.log(err);
//     console.log(data);
//     console.log(header);
// });

// o.event.del({
//     collection: 'user',
//     key: 1, 
//     type: 'login',
//     opt: {
//         purge: true
//     }
// }, function(err, header) {
//     console.log(err);
//     console.log(data);
//     console.log(header);
// });

// o.event.put('user', 1, 'login', {
//     timestamp: 1413215674842,
//     ordinal: '05bf1e5dda086000'
// }, {
//     ip: '5.5.5.5'
// }, function(err, header) {
//     console.log(err);
//     console.log(header);
// });

// o.event.put({
//     collection: 'user',
//     key: 1,
//     type: 'login',
//     timestamp: 1413215674842,
//     ordinal: '05bf1e5dda086000',
//     data: {
//         ip: '6.6.6.6'
//     }
// }, function(err, header) {
//     console.log(err);
//     console.log(header);
// });

//graph
// o.graph.get('user', '1', 'like', function(err, header, data) {
//     console.log(err);
//     console.log(data);
//     console.log(header);
// });

// o.graph.get('user', '1', ['like', 'relationship'], function(err, header, data) {
//     console.log(err);
//     console.log(data);
//     console.log(header);
// });

// o.graph.get('user', '1', ['like', 'relationship'], {
//     limit: 1
// }, function(err, header, data) {
//     console.log(err);
//     console.log(data);
//     console.log(header);
// });

// o.graph.get({
//     collection: 'user',
//     key: 1,
//     kind: ['like', 'relationship']
// }, function(err, header, data) {
//     console.log(err);
//     console.log(data);
//     console.log(header);
// });

// o.graph.put({
//     collection: 'user',
//     key: 1
// }, 'like', {
//     collection: 'user',
//     key: 2
// }, function(err, header) {
//     console.log(err);
//     console.log(header);
// });

// o.graph.put({
//     from: {
//         collection: 'user',
//         key: 1
//     }, 
//     kind: 'like', 
//     to: {
//         collection: 'user',
//         key: 2
//     }
// }, function(err, header) {
//     console.log(err);
//     console.log(header);
// });

// o.graph.del({
//     collection: 'user',
//     key: 1
// }, 'like', {
//     collection: 'user',
//     key: 2
// }, {
//     purge: true
// }, function(err, header) {
//     console.log(err);
//     console.log(header);
// });

// o.graph.del({
//     from: {
//         collection: 'user',
//         key: 1
//     }, 
//     kind: 'like', 
//     to: {
//         collection: 'user',
//         key: 2
//     },
//     opt: {
//         purge: true
//     }
// }, function(err, header) {
//     console.log(err);
//     console.log(header);
// });

