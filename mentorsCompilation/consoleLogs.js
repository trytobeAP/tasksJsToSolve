// console.log('1. Start');

// setTimeout(() => {
//   console.log('2. setTimeout');
// }, 0);

// Promise.resolve().then(() => {
//   console.log('3. Promise 1');
// }).then(() => {
//   console.log('4. Promise 2');
// });

// console.log('5. End');

////////////////////////////////////////////////

// for (var i = 1; i <= 3; i++) {
//   setTimeout(function() {
//     console.log(`var i: ${i}`);
//   }, 10 * i);
// }

////////////////////////////////////////////////

// console.log(`1. typeof null:`, typeof null); // object
// console.log(`2. typeof undefined:`, typeof undefined); // undefined
// console.log(`3. typeof NaN:`, typeof NaN); // number
// console.log(`4. null == undefined:`, null == undefined); // true
// console.log(`5. null === undefined:`, null === undefined); // false
// console.log(`6. NaN == NaN:`, NaN == NaN); // false
// console.log(`7. NaN === NaN:`, NaN === NaN); // false
// console.log(`8. [] == ![]:`, [] == ![]); // ?????? true
// console.log(`9. 0 == false:`, 0 == false); // true
// console.log(`10. "" == false:`, "" == false); // true
// console.log(`11. {} == {}:`, {} == {}); // Сравнение объектов  // false
// let a = [];
// console.log(`12. a == a:`, a == a); // true

////////////////////////////////////////////////

// console.log('Start Promise Chain');

// Promise.resolve(1)
//   .then(res => {
//     console.log('Then 1:', res);
//     // return Promise.reject('Error from Then 1'); 
//     return res * 2;
//   })
//   .then(res => {
//     console.log('Then 2:', res); 
//     throw new Error('Error from Then 2'); 
//   })
//   .catch(err => {
//     console.log('Caught:', err.message);
//     return 'Recovered from catch';
//   })
//   .then(res => {
//     console.log('Then 3 (after catch):', res); 
//   })
//   .finally(() => {
//     console.log('Finally'); 
//   });

// console.log('End Promise Chain Setup');

////////////////////////////////////////////////

let x = "10";
let y = 5;
let z = true;
let w = "2";
let a = "hello";
console.log("1:", x + y);
console.log("2:", y + x);
console.log("3:", x - y);
console.log("4:", x * w);
console.log("5:", x / w);
console.log("6:", y + z);
console.log("7:", a - y);
console.log("8:", x + w + y);
console.log("9:", y + x + w);
console.log("10:", +x + +w);
console.log("11:", (y + z) + w);
console.log("12:", "Result: " + (y * w));
console.log("13:", z + "false");
console.log("14:", 1 + 2 + "3" + 4 + 5);
console.log("15:", 1 - "1" + "1");