import {ToolsService} from "../services/tools.service";

export class Guest {

  id: string;
  date: string;

  constructor(public idEvenement: string, public nom: string, public auteur: any, public etat: number, public email: string, public phone: string) {
    const gid = new ToolsService();
    this.id = gid.generateId(23);
    this.date = new Date().toString();
  }
}
