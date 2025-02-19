export class Panic {
  message: string;
  stack: string;

  constructor(message: string) {
    this.message = message;
    this.stack = new Error().stack || "";
  }

  toString(): string {
    return `Panic! ${this.message}\n${this.stack}`;
  }
};

export default function panic(msg: string = ""): never {
  throw new Panic(msg);
}
