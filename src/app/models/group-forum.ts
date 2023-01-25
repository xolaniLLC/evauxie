import {ToolsService} from "../services/tools.service";

export class GroupForum {

  id: string;
  date: string;
  icone: string;

  constructor(public titre: string, public parent: string) {
    const gid = new ToolsService();
    this.id = gid.generateId(23);
    this.date = new Date().toString();
    this.icone = '';
  }
}
