const {
  push,
  pop,
  shift,
  unshift,
  concat,
  join,
  reverse,
  sort,
  slice,
  splice,
  reduce,
  flat,
  find,
  includes,
  some,
} = require("./arrayMethod");

test("array push method", () => {
  let arr = [1, 2, 3];
  push(arr, 4);
  expect(arr.length).toBe(4);
  expect(arr).toEqual([1, 2, 3, 4]);
});

test("array pop method", () => {
  let arr = [1, 2, 3, 4];
  const popped = pop(arr);
  expect(arr).toEqual([1, 2, 3]);
  expect(popped).toBe(4);
});

test("array shift method", () => {
  let arr = [1, 2, 3, 4];
  const shifted = shift(arr);
  expect(arr).toEqual([2, 3, 4]);
  expect(shifted).toBe(1);
});

test("unshift", () => {
  let arr = [2, 3, 4];
  unshift(arr, 1);
  expect(arr).toEqual([1, 2, 3, 4]);
});

test("concat", () => {
  let arr = [1, 2, 3];
  let concated = concat(arr, [4]);
  expect(concated).toEqual([1, 2, 3, 4]);
  expect(arr).toEqual([1, 2, 3]);

  const num1 = [[1]];
  const num2 = [2, [3]];
  const numbers = concat(num1, num2);
  expect(numbers).toEqual([[1], 2, [3]]);

  const concatedNum = concat(arr, [4], num1, num2);
  expect(concatedNum).toEqual([1, 2, 3, 4, [1], 2, [3]]);
});

test("join", () => {
  let arr = [1, 2, 3];
  let joined = join(arr);
  expect(joined).toBe("1,2,3");
  joined = join(arr, "-");
  expect(joined).toBe("1-2-3");
});

test("reverse", () => {
  let arr = [1, 2, 3];
  reverse(arr);
  expect(arr).toEqual([3, 2, 1]);
});

test("sort", () => {
  const nums = [4, 1, 2, 3, 5];
  sort(nums);
  expect(nums).toEqual([1, 2, 3, 4, 5]);

  const months = ["March", "Jan", "Feb", "Dec"];
  sort(months);
  expect(months).toEqual(["Dec", "Feb", "Jan", "March"]);

  const array1 = ["1", "30", "4", "21", "100000"];
  sort(array1);
  expect(array1).toEqual(["1", "100000", "21", "30", "4"]);
});

test("slice", () => {
  const animals = ["ant", "bison", "camel", "duck", "elephant"];
  expect(slice(animals, 2)).toEqual(["camel", "duck", "elephant"]);
  expect(slice(animals, 2, 4)).toEqual(["camel", "duck"]);
  expect(slice(animals, 1, 5)).toEqual(["bison", "camel", "duck", "elephant"]);
  expect(slice(animals, -2)).toEqual(["duck", "elephant"]);
  expect(slice(animals, 2, -1)).toEqual(["camel", "duck"]);
});

test("splice", () => {
  const months = ["Jan", "March", "April", "June"];
  splice(months, 1, 0, "Feb");
  expect(months).toEqual(["Jan", "Feb", "March", "April", "June"]);
  splice(months, 4, 1, "May");
  expect(months).toEqual(["Jan", "Feb", "March", "April", "May"]);

  let myFish = ["angel", "clown", "mandarin", "sturgeon"];
  let removed = splice(myFish, 2, 0, "drum");
  expect(myFish).toEqual(["angel", "clown", "drum", "mandarin", "sturgeon"]);
  expect(removed).toEqual([]);

  myFish = ["angel", "clown", "mandarin", "sturgeon"];
  removed = splice(myFish, 2, 0, "drum", "guitar");
  expect(myFish).toEqual([
    "angel",
    "clown",
    "drum",
    "guitar",
    "mandarin",
    "sturgeon",
  ]);
  expect(removed).toEqual([]);

  myFish = ["angel", "clown", "drum", "mandarin", "sturgeon"];
  removed = splice(myFish, 3, 1);
  expect(myFish).toEqual(["angel", "clown", "drum", "sturgeon"]);
  expect(removed).toEqual(["mandarin"]);

  myFish = ["angel", "clown", "drum", "sturgeon"];
  removed = myFish.splice(2, 1, "trumpet");
  expect(myFish).toEqual(["angel", "clown", "trumpet", "sturgeon"]);
  expect(removed).toEqual(["drum"]);
});

test("reduce", () => {
  const getMax = (a, b) => Math.max(a, b);
  expect(reduce([1, 100], getMax, 50)).toBe(100);
  expect(reduce([50], getMax)).toBe(50);
  expect(reduce([], getMax, 1)).toBe(1);

  let sum = reduce(
    [0, 1, 2, 3],
    function (previousValue, currentValue) {
      return previousValue + currentValue;
    },
    0
  );
  expect(sum).toBe(6);
});

test("flat", () => {
  const arr1 = [1, 2, [3, 4]];
  let res = flat(arr1);
  expect(res).toEqual([1, 2, 3, 4]);

  const arr2 = [0, 1, 2, [[[3, 4]]]];
  res = flat(arr2, 2);
  expect(res).toEqual([0, 1, 2, [3, 4]]);

  res = flat(arr2, 3);
  expect(res).toEqual([0, 1, 2, 3, 4]);
});

test("find", () => {
  const inventory = [
    { name: "apples", quantity: 2 },
    { name: "bananas", quantity: 0 },
    { name: "cherries", quantity: 5 },
  ];

  function isCherries(fruit) {
    return fruit.name === "cherries";
  }

  expect(find(inventory, isCherries)).toEqual({
    name: "cherries",
    quantity: 5,
  });

  function isPrime(element, index, array) {
    let start = 2;
    while (start <= Math.sqrt(element)) {
      if (element % start++ < 1) {
        return false;
      }
    }
    return element > 1;
  }

  expect(find([4, 6, 8, 12], isPrime)).toBeUndefined();
});

test("includes", () => {
  const array1 = [1, 2, 3];
  expect(includes(array1, 2)).toBeTruthy();

  const pets = ["cat", "dog", "bat"];
  expect(includes(pets, "cat")).toBeTruthy();
  expect(includes(pets, "at")).toBeFalsy();
});

test("some", () => {
  const array = [1, 2, 3, 4, 5];
  const even = (element) => element % 2 === 0;
  expect(some(array, even)).toBeTruthy();

  expect(some([2, 5, 8, 1, 4], (x) => x > 10)).toBeFalsy();
});
