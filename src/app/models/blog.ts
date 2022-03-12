import {ToolsService} from "../services/tools.service";

export class Blog {

  id: string;
  date: string;
  vus: string[];

  constructor(public images: string[], public titre: string, public contenu: string, public auteur: string, public categorie: string, public tags: string[]) {
    const gid = new ToolsService();
    this.id = gid.generateId(23);
    this.date = new Date().toString();
    this.vus = [];
  }
}
