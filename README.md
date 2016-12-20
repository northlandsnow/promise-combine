### promise合并/promise-combine
---
`自述/Self Description:`

在某些复杂的场景下可能需要动态的把个数不一定的处理逻辑动态的合并起来, 这个工具可以把一组promise合并为一个, 帮助动态的组合处理逻辑.

In the scene that we have some business process logic functions and want to combine them dynamically into one, this tool will be usefull.

`安装/Install:`

```
npm install promise-combine
```


`使用方法/How TO Use:`

```
'use strict';

//some process logic functions
//return common param
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

let cpromise = require('promise-combine');
let example1 = cpromise([exec1, exec2, exec4]);
example1
    .then(function (rst) {
        console.log('result:', rst);
    })
    .catch(err => {
        console.error('error:', err);
    });
//result: 3

let example2 = cpromise(exec1, exec2, exec4);
example2
    .then(function (rst) {
        console.log('result:', rst);
    })
    .catch(err => {
        console.error('error:', err);
    });
//result: 3

let example3 = cpromise([exec1, exec2, exec3]);
example3
    .then(function (rst) {
        console.log('result:', rst);
    })
    .catch(err => {
        console.error('error:', err);
    });
//error: Error: 3
```