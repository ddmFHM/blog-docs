# 排序算法

## 冒泡排序

冒泡排序思路：

1. 第一轮循环，将第0位和第1位比较，若第0位大于第1位则交换位置，否则不动，然后第1位和第2位比较，以此类推，完成一轮循环
2. 第一轮循环确定了一个最大值，且放在最后。
3. 第二轮循环重复上述步骤，但是外层循环去除最后一项（最后一项已经为上一轮确定好的最大值）
4. 以此类推完成排序
 
![冒泡排序](/bubbleSort.gif)

```js
  let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
  
  (function bubbleSort(arr) {

    if (arr == null || arr.length < 2) {
      return;
    }

    let end = arr.length;
    // 每次循环都确定一个最大值放在末尾，所以每次循环次数减一
    for (let i = end; end > 0; end--) {
      // 每次只需要比较到当前循环的最后一位
      for (let j = 0; j < end; j ++) {
        // 若当前项大于后面一项则交换位置
        if (arr[j] > arr[j + 1]) {
          _swap(j, j + 1);
        }
      }
    }

    function _swap(i, j) {
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

  })(arr);

  console.log(arr);
```

## 选择排序

选择排序思路：

1. 遍历数组，找到比第一项小的就和第一项交换位置
2. 一轮循环完毕最小项就确定在数组第一位
3. 从第二项开始上述过程直到排序完毕

![选择排序](/selectSort.gif)

```js
  let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];

  (function selectSort(arr) {

    if (arr == null || arr.length < 2) {
      return;
    }

    for(let i = 0; i < arr.length; i ++) {
      for(let j = i + 1; j < arr.length; j++) {
        if (arr[i] > arr[j]) {
          _swap(i, j);
        }
      }
    }

    function _swap(i, j) {
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

  })(arr);

  console.log(arr);
```

## 插入排序

## 归并排序

## 快速排序

## 希尔排序

## 堆排序

## 桶排序

## 计数排序

## 基数排序