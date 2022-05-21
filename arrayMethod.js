const push = (arr, ...values) => {
  for (let i = 0; i < values.length; i++) {
    arr[arr.length] = values[i];
  }
};

const pop = (arr) => {
  const popped = arr[arr.length - 1];
  arr.length--;
  return popped;
};

const shift = (arr) => {
  const shifted = arr[0];
  for (let i = 1; i < arr.length; i++) {
    arr[i - 1] = arr[i];
  }
  arr.length--;
  return shifted;
};

const unshift = (arr, val) => {
  for (let i = arr.length; i > 0; i--) {
    arr[i] = arr[i - 1];
  }
  arr[0] = val;
};

const concat = (arr, ...arrs) => {
  const newArr = [...arr];
  for (let i = 0; i < arrs.length; i++) {
    const arr2 = arrs[i];
    for (let j = 0; j < arr2.length; j++) {
      push(newArr, arr2[j]);
    }
  }
  return newArr;
};

const join = (arr, separator = ",") => {
  let str = "";
  for (let i = 0; i < arr.length - 1; i++) {
    str += arr[i] + separator;
  }
  str += arr[arr.length - 1];
  return str;
};

const reverse = (arr) => {
  for (let i = 0; i < arr.length / 2; i++) {
    [arr[i], arr[arr.length - i - 1]] = [arr[arr.length - 1 - i], arr[i]];
  }
};

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 1; j < arr.length - i; j++) {
      if (arr[j - 1] > arr[j]) {
        swap(arr, j, j - 1);
      }
    }
  }
}

const sort = (arr, comparator = bubbleSort) => {
  comparator(arr);
};

const slice = (arr, start = 0, end = arr.length) => {
  const arrCopy = [];

  if (start < 0) start = arr.length + start;

  if (end < 0) end = arr.length + end;

  for (let i = start; i < end; i++) {
    push(arrCopy, arr[i]);
  }

  return arrCopy;
};

const subArr = (arr, start, end = arr.length) => {
  const subArray = [];
  for (let i = start; i < end; i++) {
    subArray.push(arr[i]);
  }

  return subArray;
};

const splice = (arr, start = 0, deleteCount = 0, ...items) => {
  let subArray = null;

  const deleted = [];

  if (items.length > 0 || deleteCount > 0) {
    subArray = subArr(arr, start);
    arr.length -= arr.length - start;
  }

  while (deleteCount > 0) {
    push(deleted, shift(subArray));
    deleteCount--;
  }

  if (items.length > 0) {
    for (let i = 0; i < items.length; i++) {
      push(arr, items[i]);
    }
  }

  if (subArray && subArray.length > 0) {
    for (let i = 0; i < subArray.length; i++) {
      push(arr, subArray[i]);
    }
  }

  return deleted;
};

const reduce = (arr, reducer, initialValue) => {
  let accum = initialValue,
    counter = 0;
  if (!initialValue) {
    accum = arr[0];
    counter++;
  }
  for (let i = counter; i < arr.length; i++) {
    accum = reducer(accum, arr[i], i, arr);
  }

  return accum;
};

const flat = (arr, depth = 1) => {
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (element instanceof Array && depth > 0) {
      push(newArr, ...flat(element, depth - 1));
    } else {
      push(newArr, element);
    }
  }

  return newArr;
};

const find = (arr, cb) => {
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (cb(element)) return element;
  }

  return undefined;
};

const includes = (arr, val) => {
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (element == val) return true;
  }

  return false;
};

const some = (arr, cb) => {
  for (let i = 0; i < arr.length; i++) {
    if (cb(arr[i], i, arr)) return true;
  }

  return false;
};

module.exports = {
  find,
  flat,
  push,
  reduce,
  slice,
  splice,
  sort,
  reverse,
  concat,
  some,
  pop,
  shift,
  unshift,
  includes,
  join,
};
