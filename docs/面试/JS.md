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

防止过于频繁触发某一个事件，在事件触发后不立即执行，延时一定的间隔后执行，若等待过程中重复触发事件则重新进行计时，若延时时间到达后没有再次触发则执行该事件处理函数。

`this`可以通过`bind`函数进行绑定

```js
  function debounce(func, duration) {
    let timer = null;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args)
        clearTimeout(timer);
      }, duration)
    }
  }
```

## 节流

某个事件触发频繁，触发该事件后，在规定的时间间隔内无法继续触发，时间间隔到达后可以再次触发。

```js
  /* 方法一：时间戳+计时器 最后一次也会触发 */
  function throttle(func, duration) {
    let timer = null,
        gap = 0;
    return function(...args) {
      clearTimeout(timer)
      if(Date.now() - gap > duration) {
        func(...args);
        gap = Date.now();
      } else {
        timer = setTimeout(() => {
          func(...args);
          clearTimeout(timer);
        }, duration)
      }
    }
  }

  /* 方法二：时间戳 最后一次不会触发 */
  function throttle(func, duration) {
    let timer = 0;
    return function(...args) {
      if(Date.now() - timer > duration) {
        func(...args);
        timer = Date.now();
      }
    }
  }
```

## 克隆

## 柯里化

柯里化函数通常用于固定函数的参数

若当前函数需要接收N个参数，函数需要触发若干次，且每次触发前m项参数相同，则可以使用柯里化函数将前m项参数固定，返回一个新的函数，新的函数只需要传递m后的参数即可。

```js
  function curry(func, ...args) {
    return function(...newArgs) {
      let totalArg = args.concat(newArgs)
      if(totalArg.length >= func.length) {
        return func.apply(null, totalArg)
      } else {
        return curry.call(null, func, ...totalArg)
      }
    }
  }
```

## 函数管道

若有若干个函数，每个函数依次需要前一个函数的执行结果作为参数。则可以使用函数管道将这若干个函数组合为一个函数。

```js
  function pipe(...funcs) {
    return function(param) {
      return funcs.reduce((result, func) => {
        return func(result)
      }, param)
    }
  }
```
