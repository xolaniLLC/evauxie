import {ToolsService} from "../services/tools.service";

export class Evenement {

  id: string;
  date: string;

  constructor(public titre: string, public dateEvenement: string, public auteur: any, public categorie: string, public etat: number, public description: string) {
    const gid = new ToolsService();
    this.id = gid.generateId(23);
    this.date = new Date().toString();
  }
}
