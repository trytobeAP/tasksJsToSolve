const user = {
  name: "Alex",
  age: 30,
  greet: function () {
    setTimeout(function () {
      console.log(`Привет, меня зовут ${this.name}.`);
    }, 100);
  },
};

user.greet(); // не срабатывает корректно.

// варианты решения:
/*
 * 1) () => {} вместо function () {}
 * 2) после setTimeout сделать .bind(this)
 * 3) перед greet сохранить контекст const self = this;
 * и тогда:
 * setTimeout(function () {
  console.log(`Привет, меня зовут ${self.name}.`);
}, 100);
 */
