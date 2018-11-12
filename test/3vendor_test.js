const assert = require('assert');
const faker = require('faker');

const Rating = require('../models/ratings').model;
const User = require('../models/user').model;
const Product = require('../models/product').model;
const Vendor = require('../models/vendor').model;

describe('Playing with a vendor', () => {
    it('Adding a new vendor', done => {
        let vendor = new Vendor();
        vendor.fname = faker.name.firstName();
        vendor.lname = faker.name.lastName();
        vendor.email = faker.internet.email();
        vendor.pass = faker.internet.password();
        vendor.store = faker.company.companyName();
        vendor.url = faker.internet.url();

        vendor.save(() => {
            done();
        })
    })
})