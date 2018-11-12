const app = require('../app');
const assert = require('assert');
const request = require('supertest-session');
const faker = require('faker');

const User = require('../models/user').model;

const helper = require('./0test_helper');
let _csrf;
let firstResponse;
let totalUser = 10;

before(done => {
    helper.getCsrf((response) => {
        _csrf = response[0];
        firstResponse = response[1];
        done();
    })
});

describe('Playing with users', () => {
    xit('saves a user', (done) => {
        request(app)
        .post('/newuser')
        .set('cookie', firstResponse.headers['set-cookie'])
        .send({_csrf})
        .expect(200)
        .then(response => {
            assert(response.text == "respond with a resource");
            done();
        });
    });

    it('creates a user', (done) => {
        saveUser = async () => {
            const user = new User();
            user.fname = faker.name.firstName();
            user.lname = faker.name.lastName();
            user.email = faker.internet.email();
            user.pass = faker.internet.password();
            user.dp = faker.internet.avatar();

            user.save((err) => {
                return Promise.resolve(user);
            });
        }
        
        createUser = async () => {
            let users = [];
            for(var i = 0; i < totalUser; i++){
                users[await saveUser()];
            }

            Promise.all(users).then(() => {
                done();
            })
            // User.findById(user._id, (err, savedUser) => {
            //     assert((user._id).toString() === (savedUser._id).toString());
            //     assert(user.email === savedUser.email);
            //     done();
            // });
        }
        createUser();
    })
})