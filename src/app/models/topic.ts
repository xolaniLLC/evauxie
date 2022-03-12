import {ToolsService} from "../services/tools.service";

export class Topic {

  id: string;
  date: string;
  like: string[];
  vus: string[];

  constructor(public titre: string, public contenu: any, public auteur: any, public categorie: string) {
    const gid = new ToolsService();
    this.id = gid.generateId(23);
    this.date = new Date().toString();
    this.like = [];
    this.vus = [];
  }
}
