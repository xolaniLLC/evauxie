export class PlanCompany {

  date: string;

  constructor(public id: string, public name: string) {
    this.date = new Date().toString();
  }
}
