// // class User {
// //   constructor (name, age) {
// //     this.name = name
// //     this.age = age
// //   }

// //   sayHello() {
// //     console.log(`${this.name}: hello`)
// //   }
// // }

// // const user1 = new User('毕之', 18)
// // const user2 = new User('四亿', 14)

// // user1.sayHello()
// // user2.sayHello()

// function User(name, age) {
//   this.name = name
//   this.age = age
// }

// User.prototype.sayHello = function() {
//   console.log(`${this.name}: hello`)
// }

// const user3 = new User('毕之2', 18)
// const user4 = new User('四亿2', 20)

// user3.sayHello()
// user4.sayHello()

"use strict";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var User = /*#__PURE__*/ function () {
  function User(name, age) {
    _classCallCheck(this, User);

    this.name = name;
    this.age = age;
  }

  _createClass(User, [{
    key: "sayHello",
    value: function sayHello() {
      console.log("".concat(this.name, ": hello"));
    }
  }]);

  return User;
}();

var user1 = new User("毕之", 18);
user1.sayHello();