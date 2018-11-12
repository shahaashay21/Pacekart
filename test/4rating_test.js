const assert = require('assert');

const Rating = require('../models/ratings').model;
const User = require('../models/user').model;
const Product = require('../models/product').model;
const Vendor = require('../models/vendor').model;

describe('Adding ratings to the product by the user', () => {
    it('Adding ratings', done => {
        // User.findOne({}, (err, ans) => {
            
        //     done();
        // })
        testing = async () => {
            let user = await User.find({}).limit(5);
            let vendor = await Vendor.findOne({});
            // console.log(user);
            // console.log(vendor);

            let rating = new Rating();
            rating.user = user;
            rating.vendor = vendor;
            rating.rating = 4.2;

            rating.save(err => {
                let time = process.hrtime();
                Rating.find({}).
                populate({
                    path: 'user',
                    match: {
                        // email: /.*@gmail.com$/,
                    },
                    select: 'fname email',
                }).then((rating) => {
                    // console.log(rating[0].user);
                    // let diff = process.hrtime(time);
                    // console.log(`Time is: ${diff[0] * 1e3 + diff[1] / 1e6}`);
                    done();
                })
            });
        }

        testing();
    })
})