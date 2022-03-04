import {ToolsService} from "../services/tools.service";

export class Message {

  id: string;
  date: string;
  read: string[];
  reponse: string;

  constructor(public auteur: any, public objet: string, public destinataires: string[], public message: string, public typeMessage: string) {
    const gid = new ToolsService();
    this.id = gid.generateId(23);
    this.date = new Date().toString();
    this.read = [];
    this.reponse = '';
  }
}
