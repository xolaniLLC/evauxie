export class Utilisateur {

  photo: string;
  date: string;
  country: string;
  phone: string;
  cover: string;

  constructor(public nom: string, public email: string, public typeInscription: string, public typeUtilisateur: string) {
    this.photo = '';
    this.date = new Date().toString();
    this.country = '';
    this.phone = '';
    this.cover = '';
  }
}
