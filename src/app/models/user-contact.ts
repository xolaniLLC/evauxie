export class UserContact {

  date: string;

  constructor(public fullName: string, public email: string, public phoneNumber: string, public message: string, public eventType: string) {
    this.date = new Date().toString();
  }
}
