import {ToolsService} from "../services/tools.service";

export class CommentaireTopic {

  id: string;
  date: string;

  constructor(public auteur: string, public message: string, public idTopic: string) {
    const gid = new ToolsService();
    this.id = gid.generateId(23);
    this.date = new Date().toString();
  }
}
