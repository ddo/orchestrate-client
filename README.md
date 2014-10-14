orchestrate-client
==================

[orchestrate.io](http://orchestrate.io/) NodeJS client

##installation

```bash
npm i orchestrate-client
```

##usage

init
```js
var orchestrate = require('orchestrate-client');
var db = orchestrate(<your token here>);
```

get all the users in the "users" collection
```js
db.get('users', function(err, header, users) {
});
```

get the user with key = 1
```js
db.get('users', 1, function(err, header, user) {
});
```

search & limit
```js
db.get('users', {
    query: 'name:ddo',
    limit: 10
}, function(err, header, users) {
});
```

create
```js
db.post('users', {
    name: 'ddo',
    age: 25,
    game: 'csgo, dota'
}, function(err, header) {
});
```

read the api below for more details

##api

* [ping](#ping)
* [get](#get)
* [post](#post)
* [put](#put)
* [del](#del)

refs

* [get](#refget)

events

* [get](#eventget)
* [post](#eventpost)
* [put](#eventput)
* [del](#eventdel)

graph

* [get](#graphget)
* [put](#graphput)
* [del](#graphdel)

###ping
> validate your token(API key)

```js
db.ping(function(err, header) {
});
```

###get
> get, search, query, list documents

parameters:

* collection **``required``** ``string``
* key ``string|number``
* opt ``object`` option (limit, query...) check [orchestrate.io docs](http://orchestrate.io/docs/apiref)

example:

list
```js
db.get('users', function(err, header, users) {
});
```

list with option
```js
db.get('users', {
    limit: 5
}, function(err, header, users) {
});
```

get a document by key
```js
db.get('users', key, function(err, header, user) {
});
```

search
```js
db.get('users', {
    query: 'game:csgo',
    sort: 'value.name:asc',
    limit: 5
}, function(err, header, users) {
});
```

###post
> create document, auto generate new key

parameters:

* collection **``required``** ``string``
* data ``object``

example:

create
```js
db.post('user', {
    name: 'ddo',
    age: 25,
    game: 'csgo, dota'
}, function(err, header) {
});
```

create empty document
```js
db.post('user', function(err, header) {
});
```

###put
> create/update document

parameters:

* collection **``required``** ``string``
* key **``required``** ``string|number``
* data ``object``

example:

create/update document
```js
db.put('user', 1, {
    name: 'ddooooooo',
    age: 25,
    game: 'csgo, dota, minecraftttt'
}, function(err, header) {
});
```

###del
> delete document

parameters:

* collection **``required``** ``string``
* key ``string|number``
* opt ``object``

example:

delete document by key
```js
db.del('user', 1, function(err, header) {
});
```

delete collection **need force=true**
```js
db.del('user', {
    force: true
}, function(err, header) {
});
```

###ref.get

parameters:

* collection **``required``** ``string``
* key **``required``** ``string|number``
* ref ``string|number``
* opt ``object``

example:

get data of a ref
```js
db.ref.get('user', 1, 'any_ref', function(err, header, data) {
});
```

list all refs of a document
```js
db.ref.get('user', 1, function(err, header, data) {
});
```

list refs with option
```js
db.ref.get('user', 1, {
    limit: 5
}, function(err, header, data) {
});
```

###event.get

parameters:

* collection **``required``** ``string``
* key **``required``** ``string|number``
* type **``required``** ``string``
* opt ``object``

example:

get data of a event
```js
db.event.get('user', 1, 'login', function(err, header, data) {
});
```

get data of a event
```js
db.event.get('user', 1, 'login', {
    timestamp: 1413215674842,
    ordinal: '05bf1e5dda086000', //must be a ordinal string
    limit: 1
}, function(err, header, data) {
});
```

###event.post

parameters:

* collection **``required``** ``string``
* key **``required``** ``string|number``
* type **``required``** ``string``
* timestamp ``number``
* data ``object``

example:

```js
db.event.post('user', 1, 'login', function(err, header) {
});
```

```js
db.event.post('user', 1, 'login', {
    ip: '3.3.3.3'
}, function(err, header) {
});
```

```js
db.event.post('user', 1, 'login', 1413215674842, function(err, header) {
});
```

```js
db.event.post('user', 1, 'login', 1413215674842, {
    login: '4.4.4.4'
}, function(err, header) {
});
```

###event.put

parameters:

* collection **``required``** ``string``
* key **``required``** ``string|number``
* type **``required``** ``string``
* data ``object``

example:

```js
db.event.put('user', 1, 'login', {
    timestamp: 1413215674842,
    ordinal: '05bf1e5dda086000'
}, {
    ip: '5.5.5.5'
}, function(err, header) {
});
```

empty data
```js
db.event.put('user', 1, 'login', {
    timestamp: 1413215674842,
    ordinal: '05bf1e5dda086000'
}, function(err, header) {
});
```

###event.del

parameters:

* collection **``required``** ``string``
* key **``required``** ``string|number``
* type **``required``** ``string``
* opt ``object``

example:

**need opt purge=true**

```js
db.event.del('user', 1, 'login', {
    timestamp: 1413211094000,
    ordinal: '05bed877f0086000',
    purge: true
}, function(err, header) {
});
```

###graph.get

parameters:

* collection **``required``** ``string``
* key **``required``** ``string|number``
* kind **``required``** ``string|array`` relations
* opt ``object``

example:

```js
db.graph.get('user', 1, 'like', function(err, header, data) {
});
```

```js
db.graph.get('user', 1, ['like', 'relationship'], function(err, header, data) {
});
```

```js
db.graph.get('user', 1, ['like', 'relationship'], {
    limit: 5
}, function(err, header, data) {
});
```

###graph.put

parameters:

* from **``required``** ``object`` with collection name and key
* kind **``required``** ``string`` relation
* to **``required``** ``object`` with collection name and key

example:

```js
db.graph.put({
    collection: 'user',
    key: 1
}, 'like', {
    collection: 'user',
    key: 2
}, function(err, header) {
});
```

```js
db.graph.put({
    from: {
        collection: 'user',
        key: 1
    }, 
    kind: 'like', 
    to: {
        collection: 'user',
        key: 2
    }
}, function(err, header) {
});
```

###graph.del

parameters:

* from **``required``** ``object`` with collection name and key
* kind **``required``** ``string`` relation
* to **``required``** ``object`` with collection name and key
* opt ``object``

example:

**need purge=true**
```js
db.graph.del({
    collection: 'user',
    key: 1
}, 'like', {
    collection: 'user',
    key: 2
}, {
    purge: true
}, function(err, header) {
});
```

##note

* you can pass to all api with 2 params: (``option``, ``callback``)

example

```js
db.get({
    collection: 'user',
    key: 1,
    opt: {
        query: 'game:csgo',
        sort: 'value.name:asc'
    }
}, function(err, header, data) {
});

db.graph.del({
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
});
```

##[changelog](/releases)

##testing

set ``env.ORCHESTRATE_TOKEN=<your token>``

```bash
$ npm test
```