import {ToolsService} from "../services/tools.service";

export class AvisCompany {

  id: string;
  date: string;
  reponseCompany: string;

  constructor(public idCompany: string, public note: number, public texte: string, public auteur: string) {
    const gid = new ToolsService();
    this.id = gid.generateId(23);
    this.date = new Date().toString();
    this.reponseCompany = '';
  }
}
