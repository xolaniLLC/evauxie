import {ToolsService} from "../services/tools.service";

export class Depense {

  id: string;
  date: string;
  coutEstime: number;
  coutFinal: number;
  paye: number;

  constructor(public idEvenement: string, public titre: string, public auteur: any, public categorie: string) {
    const gid = new ToolsService();
    this.id = gid.generateId(23);
    this.date = new Date().toString();
    this.coutEstime = 0;
    this.coutFinal = 0;
    this.paye = 0;
  }
}
