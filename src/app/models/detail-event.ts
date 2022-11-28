import {ToolsService} from "../services/tools.service";

export class DetailEvent {

  id: string;
  date: string;

  constructor(public idEvenement: string, public titre: string, public auteur: any, public categorie: string, public etat: string, public description: string) {
    const gid = new ToolsService();
    this.id = gid.generateId(23);
    this.date = new Date().toString();
  }
}
