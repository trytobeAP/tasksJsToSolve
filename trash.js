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

// ---------------------

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

// 1
// 3
// 6
// 5 - ошибочка, подловили. resolve() возвращает "undefined", у resolve() нет .then()
// так что будет 'undefined' вместо '5'
// 2

// console.log(1);
// setTimeout(() => console.log(2), 0);
// new Promise((resolve) => {
//   console.log(3);
//   resolve(4);
// });
// new Promise((resolve) =>
//   resolve()
// ).then(() => {
//     console.log(5);
//   });
// console.log(6);

// 1
// 3
// 6
// 5 - в таком случае уже Promise.then(), все правильно и '5' будет выведена
// 2

// -------------------------

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

// log_in_breadth({
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

// ===============
// комплексная задача на Promise и event loop -- симулятор запуска ракеты
// ===============

/**
 * 1) delay()
 * 2) имитация api
 * 3) подготовка к запуску - prepareForLaunch()
 * 3.1) параллельный этап
 * 3.2) последовательный этап
 * 4) Обработка ошибок (Retry Logic) - реализовать функцию checkWeather().
 */

// 1. Утилита задержки
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// 2. Имитация систем
function loadNavigationSystem() {
  console.log("Загрузка навигации...");
  return delay(1000).then(() => {
    console.log("Навигация загружена");
    return "Navigation OK";
  });
}

function checkPropulsion() {
  console.log("Проверка двигателей...");
  return delay(500).then(() => {
    console.log("Двигатели проверены");
    return "Propulsion OK";
  });
}

function checkSensor(type) {
  return delay(200).then(() => {
    console.log(`Сенсор [${type}] проверен`);
    return "Sensor [type] OK";
  });
}

// 4. Погода и Retry
function checkWeather() {
  console.log("Проверка погоды...");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve("Погода отличная ☀️");
      } else {
        reject(new Error("Ветрено 💨"));
      }
    }, 300);
  });
}

async function ensureSafeWeather() {
  console.log("Начинаем мониторинг погоды...");
  while (true) {
    try {
      return await checkWeather();
    } catch (error) {
      console.error(`Погода плохая: ${error.message}. Ждем...`);
      await delay(500);
    }
  }
}

// 3. Главная функция запуска
async function prepareForLaunch() {
  console.time("Total prep time"); // Засечем время

  console.log("--- ЭТАП 1: Системы ---");
  // Запусти loadNavigationSystem и checkPropulsion ПАРАЛЛЕЛЬНО
  // const [navStatus, propStatus] = ...
  const results = await Promise.all([
    loadNavigationSystem(),
    checkPropulsion(),
  ]);

  const [navStatus, propStatus] = results;
  console.log(navStatus, propStatus);

  console.log("--- ЭТАП 2: Сенсоры ---");
  const sensors = ["Temperature", "Pressure", "Humidity"];
  for (const element of sensors) {
    const status = await checkSensor(element);
    console.log(status);
  }

  console.log("--- ЭТАП 3: Погода ---");
  // Вызови ensureSafeWeather
  const weatherStatus = await ensureSafeWeather();
  console.log(weatherStatus);

  console.log("--- ЭТАП 4: Финальный опрос ---");
  // Вставь код для Event Loop Quiz отсюда

  console.timeEnd("Total prep time");
  console.log("🚀 ЗАПУСК!");

  console.log("Final checks started");
  setTimeout(() => console.log("Ground control ready"), 0);
  Promise.resolve().then(() => console.log("System ready"));
  console.log("Requesting launch permission");
}

// Запуск симуляции
// prepareForLaunch();

// ---------------

// ===============
// [задача с собеса] на Event loop + Promise
// ===============

// console.log("1");

// const promise1 = Promise.resolve().then(() => {
//   console.log("2");

//   const timer2 = setTimeout(() => {
//     console.log("3");
//   }, 0);
// });

// const timer1 = setTimeout(() => {
//   console.log("4");
//   const promise2 = Promise.resolve().then(() => {
//     console.log("5");
//   });
// }, 0);

// console.log("6");

/**
 * 1
 * 6
 * 2
 * 4
 * 5
 * 3
 */

// ---------------

// ===============
// [тренировка задач] на Event loop + Promise
// ===============

// console.log('1');

// Promise.resolve().then(() => {
//   console.log('2');
// });

// Promise.resolve().then(() => {
//   console.log('3');
//   return 'foo';
// }).then(() => {
//   console.log('4');
// });

// Promise.resolve().then(() => {
//   console.log('5');
// });

// console.log('6');

/**
 * 1
 * 6
 * 2
 * 3
 * 5
 * 4
 */

// ---------------

// Promise.resolve().then(() => {
//   console.log('1');
//   Promise.resolve().then(() => {
//     console.log('2');
//   });
// });

// Promise.resolve().then(() => {
//   console.log('3');
//   Promise.resolve().then(() => {
//     console.log('4');
//   });
// });

/**
 * 1
 * 3
 * 2
 * 4
 */

// ---------------

// console.log('1');

// setTimeout(() => {
//   console.log('2');
//   Promise.resolve().then(() => {
//     console.log('3');
//   });
// }, 0);

// Promise.resolve().then(() => {
//   console.log('4');
//   setTimeout(() => {
//     console.log('5');
//   }, 0);
// });

// console.log('6');

/**
 * 1
 * 6
 * 4
 * 2
 * 3
 * 5
 */

// ---------------

// async function async1() {
//   console.log("1");
//   await async2();
//   console.log("2"); //1
// }

// async function async2() {
//   console.log("3");
// }

// console.log("4");

// setTimeout(() => { ///1
//   console.log("5");
// }, 0);

// async1();

// new Promise((resolve) => {
//   console.log("6");
//   resolve();
// }).then(() => {
//   console.log("7"); //2
// });

// console.log("8");

/**
 * 4
 * 1
 * 3
 * 6
 * 8
 * 2
 * 7
 * 5
 */

// ---------------

// async function foo() {
//   console.log("1");
// }

// async function bar() {
//   console.log("2");
//   await foo();
//   console.log("3"); //1
// }

// console.log("4");

// bar();

// console.log("5");

// Promise.resolve()
//   .then(() => {
//     console.log("6");//2
//   })
//   .then(() => {
//     console.log("7");//3
//   });

// console.log("8");

/**
 * 4
 * 2
 * 1
 * 5
 * 8
 * 3
 * 6
 * 7
 */

// ---------------

// console.log("1");

// setTimeout(() => {
//   console.log("2");
//   Promise.resolve().then(() => {
//     console.log("3");
//   });
// }, 0);

// async function main() {
//   console.log("4");

//   await new Promise((resolve) => {
//     console.log("5");
//     resolve();
//   });

//   console.log("6");

//   await Promise.resolve().then(() => {
//     console.log("7");
//   });

//   console.log("8");

//   setTimeout(() => {
//     console.log("9");
//   }, 0);
// }

// main();

// console.log("10");

// Promise.resolve()
//   .then(() => {
//     console.log("11");
//   })
//   .then(() => {
//     console.log("12");
//   });

// console.log("13");

/**
 * 1
 * 4
 * 5
 * 10
 * 13
 * 6
 * 11
 * 7
 * 12
 * 8
 * 2
 * 3
 * 9
 */

// ---------------

console.log('1');

async function main() {
  console.log('2');

  try {
    await Promise.reject('Error 1');
  } catch (e) { 
    console.log('3');
  }

  console.log('4');

  await Promise.resolve() 
    .then(() => {
      console.log('5');
      throw new Error('Error 2');
    })
    .catch(() => {
      console.log('6');
      return 'Fixed';
    })
    .then((res) => {
      console.log('7', res);
    })
    .finally(() => {
      console.log('8');
    });

  console.log('9');
}

main();

Promise.resolve()
  .then(() => {
    console.log('10');
  })
  .then(() => { 
    console.log('11');
  });

console.log('12');

/**
 * 1
 * 2
 * 12
 * 3
 * 4
 * 10
 * 5
 * 11
 * 6
 * 7 Fixed
 * 8
 * 9
 */