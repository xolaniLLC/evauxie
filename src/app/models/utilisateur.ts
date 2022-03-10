export class Utilisateur {

  photo: string;
  date: string;
  country: string;
  priceRang: number;

  constructor(public nom: string, public prenom: string, public email: string, public typeInscription: string, public typeUtilisateur: string) {
    this.photo = '';
    this.date = new Date().toString();
    this.country = '';
    this.priceRang = 0;
  }
}
