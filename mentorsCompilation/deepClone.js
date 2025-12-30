function deepClone(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj);
  }

  if (hash.has(obj)) {
    return hash.get(obj);
  }

  const result = Array.isArray(obj) ? [] : {};

  hash.set(obj, result);

  for (let key of Object.keys(obj)) {
    result[key] = deepClone(obj[key], hash);
  }

  return result;
}

// --- Тесты ---
const obj1 = { a: 1, b: { c: 2, d: [3, 4] }, date: new Date() };
obj1.circular = obj1; // Добавим циклическую ссылку
const obj2 = deepClone(obj1);

console.log("Тест deepClone:");
console.log("Оригинал:", obj1);
console.log("Копия:", obj2);
console.log("obj1 === obj2:", obj1 === obj2); // false
console.log("obj1.b === obj2.b:", obj1.b === obj2.b); // false
console.log("obj1.b.d === obj2.b.d:", obj1.b.d === obj2.b.d); // false
obj2.b.c = 99;
obj2.b.d.push(5);
console.log("Изменили копию. Оригинал b.c:", obj1.b.c); // 2
console.log("Изменили копию. Оригинал b.d:", obj1.b.d); // [3, 4]
console.log(
  "Циклическая ссылка в копии ведет на копию?",
  obj2.circular === obj2
); // true
console.log(
  "Дата скопирована?",
  obj2.date instanceof Date && obj1.date.getTime() === obj2.date.getTime()
); // true (простая проверка)
