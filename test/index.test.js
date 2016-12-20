/**
 * promise-combine test
 */

function exec1() {
    return 1;
}
//return promise
function exec2(arg) {
    return Promise.resolve(++arg);
}
//return error
function exec3(arg) {
    return new Error(++arg);
}
//return a function
function exec4(arg) {
    return function () {
        return ++arg;
    };
}

const cpromise = require('../index.js');
const should = require('should');

describe('test index', function () {
    context('arguments is common', function () {
        it('success', function (done) {
            let example1 = cpromise([exec1, exec2, exec4]);
            example1
                .then(rst => {
                    should(rst).eql(3);
                    return done();
                })
                .catch(err => {
                    return done(err);
                });
        });
    });
    context('arguments is spread', function () {
        it('success', function (done) {
            let example2 = cpromise(exec1, exec2, exec4);
            example2
                .then(rst => {
                    should(rst).eql(3);
                    return done();
                })
                .catch(err => {
                    return done(err);
                });
        });
    });

    context('return error', function () {
        it('success', function (done) {
            let example3 = cpromise([exec1, exec2, exec3]);
            example3
                .catch(err => {
                    should(+err.message).eql(3);
                    return done();
                });
        });
    });
});
