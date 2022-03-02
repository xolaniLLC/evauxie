import {ToolsService} from "../services/tools.service";

export class CommentaireBlog {

  id: string;
  date: string;

  constructor(public nom: string, public email: string, public message: string, public idBlog: string) {
    const gid = new ToolsService();
    this.id = gid.generateId(23);
    this.date = new Date().toString();
  }
}
