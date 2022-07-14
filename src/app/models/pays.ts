
export class Pays {

  date: string;
  villes: string[];

  constructor(public code: number, public nom: string, public nomCourt: string) {
    this.date = new Date().toString();
    this.villes = [];
  }
}
