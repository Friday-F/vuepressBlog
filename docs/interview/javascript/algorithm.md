## 1.排序

### 冒泡排序

- 两两比较，外层循环轮数，内层循环每轮循环的次数

```js
//一轮轮比较，每一轮都从第一项开始，拿出当前项和后一项进行比较，当前项a如果大于后一项b，就交换位置
// 最大的轮数 arr.length - 1
// 每轮最大次数： arr.length - 1 - i 不用跟自己比较，把之前比较的给排除掉
function sort(arr) {
  // 外层控制比较的轮数
  for (let i = 0; i < arr.length - 1; i++) {
    let isFlag = true
    // 内层控制每一轮比较的次数
    for (let j = 0; j < arr.length - 1 - i; j++) {
      //每一轮都会比较出一个最大值，然后后一轮没有必要再比较了，所以没比较一轮，就少比较一次。。。
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        isFlag = false
      }
    }
    if (isFlag) {
      break
    }
  }
  return arr
}
```

### 插入排序

```js
function insert(arr) {
  // 拿出默认一张牌
  let tmp = arr[0]
  let newArr = []
  newArr.push(tmp)
  for (let i = 1; i < arr.length; i++) {
    // 抓到的新牌
    let a = arr[i]
    // 从后往前比较
    for (let j = newArr.length - 1; j >= 0; j--) {
      // 手里的牌
      let b = newArr[j]
      // 如果抓到的牌比手里的牌大
      if (a > b) {
        // 放到当前的牌的前面
        newArr.splice(j + 1, 0, a)
        break
      }
      // 如果没有比手里的牌都小，直接放到最前面
      if (j == 0) {
        newArr.unshift(a)
      }
    }
  }
  return newArr
}
```

### 快速排序

```js
function quick(arr) {
  if (arr.length <= 1) {
    return arr
  }
  // 寻找中间项
  let middleIndex = Math.floor(arr.length / 2)
  let middleVal = arr.splice(middleIndex, 1)[0]
  let leftArr = []
  let rightArr = []
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i]
    if (item < middleVal) {
      leftArr.push(item)
    } else {
      rightArr.push(item)
    }
  }
  return quick(leftArr).concat(middleVal, quick(rightArr))
}
```

## 2.判断子序列

```js
function fn(s, l) {
  let sLength = s.length
  let lLength = l.length
  let sIndex = 0
  let lIndex = 0
  while (lIndex < lLength) {
    if (s[sIndex] === l[lIndex]) {
      sIndex++
    }
    if (sIndex === sLength) {
      return true
    }
    lIndex++
  }
  return false
}
let s = "abcz"
let l = "aefbdgchz"
fn(s, l) //true
```
