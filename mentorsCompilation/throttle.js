function throttle(func, limit) {
  let isAvailable = true;

  return function (...args) {
    if (isAvailable) {
      func.call(this, ...args);
      isAvailable = false;
      setTimeout(() => {
        isAvailable = true;
      }, limit);
    }
  };
}

// --- Тесты ---
let throttleCount = 0;
const throttledLog = throttle(() => {
  throttleCount++;
  console.log(`Вызов throttle #${throttleCount}`);
}, 300);

console.log("Тест throttle: Вызываем много раз в течение 1 секунды");
let intervalId = setInterval(throttledLog, 50); // Вызываем каждые 50ms

// Остановим через 1 секунду и проверим
setTimeout(() => {
  clearInterval(intervalId);
  // За 1000ms должно было произойти ~1000/300 = 3-4 вызова
  console.log("Финальное кол-во вызовов throttle (примерное):", throttleCount);
  // Проверяем, что после паузы снова работает
  setTimeout(throttledLog, 350);
  setTimeout(
    () =>
      console.log(
        "Финальное кол-во вызовов throttle (после паузы):",
        throttleCount
      ),
    800
  );
}, 1000);
