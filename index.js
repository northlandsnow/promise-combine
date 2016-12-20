'use strict';

function Combine(...args) {
    //support (fn1,fn2,fn3) and ([fn1,fn2,fn3]) arguments
    let fns = [];
    for (let fn of args) {
        fns = fns.concat(fn)
    }

    //iterate fns
    let _promise = Promise.resolve();
    for (let i = 0; i < fns.length; i++) {
        let _curFn = fns[i];
        _promise = _promise.then(function (rst) {
            let _curResult = _curFn(rst);
            if (Object.prototype.toString.call(_curResult) === '[object Promise]') {
                return _curResult;
            } else if (Object.prototype.toString.call(_curResult) === '[object Function]') {
                return Promise.resolve(_curResult());
            } else if (Object.prototype.toString.call(_curResult) === '[object Error]') {
                return Promise.reject(_curResult);
            } else {
                return Promise.resolve(_curResult);
            }
        });
    }
    return _promise;
}

module.exports = Combine;
