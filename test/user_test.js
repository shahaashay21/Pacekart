const app = require('../app');
const assert = require('assert');
const request = require('supertest-session');
const User = require('../models/user_model');

let _csrf;
let firstResponse;

var cheerio = require('cheerio');

function extractCsrfToken (res) {
  var $ = cheerio.load(res.text);
  return $('meta[name="csrf-token"]').prop('content');
}

beforeEach(done => {
    request(app)
    .get('/')
    .expect(200)
    .end((err, res) => {
        if (err) return done(err);
        // console.log(res);
        _csrf = extractCsrfToken(res);
        firstResponse = res;
        done();
    });
})

describe('Creating users', () => {
    it('saves a user', (done) => {
        request(app)
        .post('/newuser')
        .set('cookie', firstResponse.headers['set-cookie'])
        .set({_csrf})
        .send({_csrf})
        .expect(200)
        .then(response => {
            assert(response.text == "respond with a resource");
            done();
        });
    })
})