function debounce(func, wait) {
  // 1. Объяви переменную для хранения ID таймера (пусть будет `timeoutId`)
  let timeoutId;

  
  // Возвращаем функцию-обертку. Именно она будет вызываться в коде как debouncedLog()
  return function(...args) {
    let context = this;
    // 2. Если в `timeoutId` уже что-то есть (старый таймер), его надо отменить.
    // Какую команду используем для отмены таймера?
    if (timeoutId) clearTimeout(timeoutId);

    // 3. Теперь создаем новый таймер и записываем его ID в переменную `timeoutId`.
    // Внутрь setTimeout положи вызов func(...args).
    timeoutId = setTimeout(() => {
      func.call(context, ...args)
    }, wait)
  };
}

/**
 * упрощенная версия без контекста
 */
function debounce2(func2, wait2) {
  let timeoutId2;

  return function () {
    if (timeoutId2) clearTimeout(timeoutId2);

    timeoutId2 = setTimeout(() => {
      func2()
    }, wait2)
  }
}

// --- Тесты ---
let callCount = 0;
const debouncedLog = debounce2(() => {
  callCount++;
  console.log(`Вызов debounce #${callCount}`);
}, 300);

console.log("Тест debounce: Вызываем 3 раза быстро, затем ждем");
debouncedLog();
debouncedLog();
debouncedLog(); // Ожидаем только один console.log через ~300ms

// Проверка через время
setTimeout(
  () => console.log("Финальное кол-во вызовов debounce:", callCount),
  500
); // Ожидаем 1
setTimeout(() => debouncedLog(), 600); // Еще вызов
setTimeout(
  () => console.log("Финальное кол-во вызовов debounce:", callCount),
  1000
); // Ожидаем 2
