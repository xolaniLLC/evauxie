import {ToolsService} from "../services/tools.service";

export class Company {

  id: string;
  date: string;
  siteWeb: string;
  pays: string;
  ville: string;
  codePostal: string;
  adresse: string;
  localisation: any;
  description: string;
  categorie: string;
  verifier: string;
  misAjour: string;
  photo: string;
  logo: string;
  faq: any;
  nom: string;
  phone: string;

  constructor(public administrateur: any[]) {
    const gid = new ToolsService();
    this.nom = '';
    this.id = gid.generateId(23);
    this.date = '';
    this.siteWeb = '';
    this.pays = '';
    this.ville = '';
    this.codePostal = '';
    this.adresse = '';
    this.description = '';
    this.categorie = '';
    this.verifier = '';
    this.misAjour = '';
    this.photo = '';
    this.logo = '';
    this.phone = '';
  }
}
