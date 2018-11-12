const mongoose = require('mongoose');
const app = require('../app');
const request = require('supertest-session');

// Check mongodb connection
before(done => {
    mongoose.connection
    .once('open', () => {
        // console.log('Good to go!');
        done();
    })
    .on('error', (error) => {
        console.warn("Warning", error);
    })
});

// Drop all the collections
before(done => {
    cleanUp(done).then(done =>{
        done();
    }).catch(err => {
        console.log("DB deletion error");
        done();
    })
})

cleanUp = async (done) => {
    try{
        await mongoose.connection.db.dropCollection('users');
        await mongoose.connection.db.dropCollection('products');
        await mongoose.connection.db.dropCollection('vendors');
        await mongoose.connection.db.dropCollection('ratings');
        return Promise.resolve();
    } catch(err) {
        console.log(err);
        return Promise.reject();
    }
}


let _csrf;
let firstResponse;

var cheerio = require('cheerio');

function extractCsrfToken (res) {
  var $ = cheerio.load(res.text);
  return $('meta[name="csrf-token"]').prop('content');
}

before(done => {
    request(app)
    .get('/')
    .expect(200)
    .end((err, res) => {
        if (err) return done(err);
        _csrf = extractCsrfToken(res);
        firstResponse = res;
        exports._csrf = _csrf;
        exports.firstResponse = firstResponse;
        done();
    });
});

exports.getCsrf = ((callback) => {
    request(app)
    .get('/')
    .expect(200)
    .end((err, res) => {
        if (err) return done(err);
        _csrf = extractCsrfToken(res);
        firstResponse = res;
        callback([_csrf, firstResponse]);
    });
});