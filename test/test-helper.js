const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pacekart_test', {useNewUrlParser: true});


before(done => {
    mongoose.connection
    .once('open', () => {
        // console.log('Good to go!');
        done();
    })
    .on('error', (error) => {
        console.warn("Warning", error);
    })
})