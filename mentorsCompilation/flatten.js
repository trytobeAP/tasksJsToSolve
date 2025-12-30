function flatten(arr) {
  let result = [];

  arr.forEach((element) => {
    if (!Array.isArray(element)) {
      result.push(element);
    } else {
      result.push(...flatten(element));
    }
  });

  return result;
}

// --- Тесты ---
const nestedArray1 = [1, [2, 3], 4];
const nestedArray2 = [1, [2, [3, [4, 5]]], 6];
const emptyArray = [];
const alreadyFlat = [1, 2, 3];

console.log("Тест flatten:");
console.log("flatten(nestedArray1) =>", flatten(nestedArray1)); // [1, 2, 3, 4]
console.log("flatten(nestedArray2) =>", flatten(nestedArray2)); // [1, 2, 3, 4, 5, 6]
console.log("flatten(emptyArray) =>", flatten(emptyArray)); // []
console.log("flatten(alreadyFlat) =>", flatten(alreadyFlat)); // [1, 2, 3]
