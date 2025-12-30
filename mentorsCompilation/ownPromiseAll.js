function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    let countCompleted = 0;
    const results = [];

    if (promises.length === 0) {
      resolve([])
    }

    promises.forEach((element, index) => {
      Promise.resolve(element)
      .then((value) => {
        results[index] = value;
        countCompleted++;
        
        if (countCompleted === promises.length) {
          resolve(results)
        }
      })
      .catch((error) => {
        reject(error)
      })
    });
  });
}

// --- Тесты ---
console.log("Тест promiseAll:");
const p1 = Promise.resolve(1);
const p2 = new Promise((resolve) => setTimeout(() => resolve(2), 100));
const p3 = 3; // не промис
const pError = Promise.reject("Ошибка!");

promiseAll([p1, p2, p3])
  .then((results) => console.log("Успех 1:", results)) // [1, 2, 3]
  .catch((error) => console.error("Ошибка 1:", error));

promiseAll([p1, pError, p2])
  .then((results) => console.log("Успех 2:", results))
  .catch((error) => console.error("Ошибка 2:", error)); // "Ошибка!"

promiseAll([])
  .then((results) => console.log("Успех (пустой массив):", results)) // []
  .catch((error) => console.error("Ошибка (пустой массив):", error));
