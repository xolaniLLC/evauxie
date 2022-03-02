export class Subscriber {

  date: string;

  constructor(public email: string) {
    this.date = new Date().toString();
  }
}
