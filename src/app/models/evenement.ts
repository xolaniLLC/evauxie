import {ToolsService} from "../services/tools.service";

export class Evenement {

  id: string;
  date: string;
  estimationBudget: number;

  constructor(public titre: string, public dateEvenement: string, public auteur: any, public categorie: string, public etat: number, public description: string) {
    const gid = new ToolsService();
    this.id = gid.generateId(23);
    this.date = new Date().toString();
    this.estimationBudget = 0;
  }
}
