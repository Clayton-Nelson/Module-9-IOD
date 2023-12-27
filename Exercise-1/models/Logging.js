class Logging {
  constructor() {
    this.id = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  }

  #log (value) {
    console.log(`[Calculator :${this.id}]:${value}`);
  };

  log (value) {
    this.#log(value)
  }
}

module.exports = Logging