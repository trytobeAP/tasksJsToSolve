/* с какого-то чужого собеса*/
// const user = {
//   name: "Alex",
//   age: 30,
//   greet: function () {
//     setTimeout(function () {
//       console.log(`Привет, меня зовут ${this.name}.`);
//     }, 100);
//   },
// };

// user.greet(); // не срабатывает корректно.

// // варианты решения:
// /*
//  * 1) () => {} вместо function () {}
//  * 2) после setTimeout сделать .bind(this)
//  * 3) перед greet сохранить контекст const self = this;
//  * и тогда:
//  * setTimeout(function () {
//   console.log(`Привет, меня зовут ${self.name}.`);
// }, 100);
//  */

/* раззвалился на этих 2ух задачах на hr-скрине:*/

// console.log(1);
// setTimeout(() => console.log(2), 0);
// new Promise((resolve) => {
//   console.log(3);
//   resolve(4);
// });
// new Promise((resolve) =>
//   resolve().then(() => {
//     console.log(5);
//   })
// );
// console.log(6);

// const a = ["bunny", "zipper", "auto"];
// const b = a.sort().map((item) => `My ${item}`);
// b.forEach((item, index) => {
//   console.log(`Your${a[index]}, and ${item}`);
// });

// log_in_depth({
//   a: {
//     l: { u: 8 },
//     b: 1,
//   },

//   c: {
//     d: 2,
//     e: { f: 7 },
//   },

//   j: 4,
// });

function log_in_depth(obj) {
  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }

    const val = obj[key];

    if (typeof val === "number") {
      console.log(val);
    } else {
      log_in_depth(val);
    }
  }
}

// // также можно так:
// for (const key of Object.keys(obj)) {
//   const val = obj[key];
//   // ...
// }

// // и, если нужны и key, и val, то так
// for (const [key, val] of Object.entries(obj)) {
//   // ...
// }

log_in_breadth({
  a: {
    l: { u: 8 },
    b: 1,
  },

  c: {
    d: 2,
    e: { f: 7 },
  },

  j: 4,
});

function log_in_breadth(obj) {
  const queue = [obj];

  while (true) {
    const obj = queue.shift();
    for (const key in obj) {
      if (!obj.hasOwnProperty(key)) {
        continue;
      } else {
        const val = obj[key];
        if (typeof val === "number") {
          console.log(val);
        } else {
          queue.push(val);
        }
      }
    }
    if (!queue.length) {
      break;
    }
  }
}
