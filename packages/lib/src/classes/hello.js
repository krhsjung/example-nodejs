export class Hello {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, ${this.name}!`;
  }

  name() {
    return this.name;
  }
}