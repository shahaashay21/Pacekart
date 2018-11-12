const app = require('../app');
const assert = require('assert');
const request = require('supertest-session');
const faker = require('faker');

const User = require('../models/user').model;
const Product = require('../models/product').model;

const helper = require('./0test_helper');
let _csrf;
let firstResponse;
let maximumProducts = 1000;

before(done => {
    helper.getCsrf((response) => {
        _csrf = response[0];
        firstResponse = response[1];
        done();
    })
});


describe("Playing with products", () => {
    it('Adding a product', done => {
        addProducts =  async () => {
            try {
                let newProductArray = [];
                for(var i = 0; i < maximumProducts; i++){
                    newProductArray[saveProduct()];
                }
                await Promise.all(newProductArray).catch(err => {
                    console.log("Something went wrong");
                });
                done();
            } catch (error) {
                console.error(error);
            }
        };
        addProducts();
    });

    let saveProduct = (() => {
        new Promise((resolve, reject) => {
            const product = new Product();
            product.name = faker.commerce.product();
            product.description = faker.commerce.productName();

            product.save(err => {
                resolve();
            })
        })
    });
})