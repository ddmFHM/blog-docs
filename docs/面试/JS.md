# JS习题

## 原型链继承

利用原型链模拟class继承

```js
  function Animal(name, variety, age) {
    this.name = name
    this.variety = variety
    this.age = age
  }

  Animal.prototype.sayHello = function() {
    console.log(`我是${this.name}, 我${this.age}岁了`)
  }

  function Dog(name, variety, age) {
    this.uber(name, variety, age)
  }



  // 圣杯模式(兼容性写法)
  function inherit(son, father) {
    var Temp = function() {}
    return function(son, father) {
      Temp.prototype = father.prototype
      son.prototype = new Temp()
      son.prototype.constructor = son
      son.prototype.uber = father
    }
  }

  // 圣杯模式(Object.create)
  function inherit(son, father) {
    son.prototype = Object.create(father.prototype)
    son.prototype.constructor = son
    son.prototype.uber = father
  }

  // Dog类继承Animal类
  inherit(Dog, Animal)

  const dog = new Dog('旺财', '狗', '3')

  dog.sayHello() // 我是旺财, 今年3岁了
```

## 防抖

## 节流

## 克隆

## 柯里化

## 函数管道