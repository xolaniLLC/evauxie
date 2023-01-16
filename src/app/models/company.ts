import {ToolsService} from "../services/tools.service";
import {Faq} from "./faq";

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
  phototheque: any[];
  logo: string;
  nom: string;
  phone: string;
  faq: Faq[];
  price: string[];
  devise: string;
  sousCategorie: string;
  eventEnCours: string[];
  affordbility: string;

  constructor(public administrateurs: any[]) {
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
    this.phototheque = [];
    this.logo = '';
    this.phone = '';
    this.devise = '';
    this.faq = [];
    this.price = ['0', '0'];
    this.sousCategorie = '';
    this.eventEnCours = [];
    this.affordbility = '';
  }
}
