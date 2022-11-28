import { Component, OnInit } from '@angular/core';
import {Company} from "../../models/company";
import {CategorieActivite} from "../../models/categorie-activite";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {CategoriesService} from "../../services/categories.service";
import {AlertService} from "../../services/alert.service";
import {CompanyService} from "../../services/company.service";
import {DomSanitizer} from "@angular/platform-browser";
import {FormBuilder} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import firebase from "firebase";
import {Faq} from "../../models/faq";

@Component({
  selector: 'app-informations-company',
  templateUrl: './informations-company.component.html',
  styleUrls: ['./informations-company.component.scss']
})
export class InformationsCompanyComponent implements OnInit {

  slider: any;
  defaultTransform: any;
  listCompany: Company[] = [];
  currentCompany: any;
  stepMake = 0;
  imgFile: any[] = [];
  uploadForm = this.formBuilder.group({
    file: ['']
  });
  isLoading = false;
  categoriesActivity: CategorieActivite[] = [];
  sousMenu = 1;

  constructor(private router: Router, private userService: UserService, private categorieService: CategoriesService, private alertService: AlertService, private companyService: CompanyService, private sanitizer: DomSanitizer, private formBuilder: FormBuilder, private apiService: ApiService) {
  }

  addSousCategorie() {
    const tmp: any = prompt('Nom de la sous categorie');
    this.categorieService.ajouterCategorieActivite(new CategorieActivite(tmp.toString() as string, '318a527a244caec0556dae'));
  }

  ngOnInit(): void {
    this.userService.getInfosUserWitchId(firebase.auth().currentUser?.email).then(
      (val) => {
        if(val.typeUtilisateur === 'vendor') {
          this.slider = document.getElementById("slider");
          this.defaultTransform=0;

          this.categorieService.getCategoriesActivites().then(
            (data) => {
              this.categoriesActivity = data;
            }
          );

          this.companyService.getCompanies().then(
            (docRef) => {
              if(docRef.length === 0) {
                this.addNewCompany();
              }
              for(let i=0; i<docRef.length; i++) {
                if(!docRef[i].date)
                  this.listCompany.unshift(docRef[i]);
                else
                  this.listCompany.push(docRef[i]);

                if(i === docRef.length - 1)
                  this.currentCompany = this.listCompany[0];
              }

            }
          );
        }
      }
    );
  }

  recupNomCategorie(idCategorie: string) {
    let result = '';
    for(let i=0; i<this.categoriesActivity.length; i++)
      if(this.categoriesActivity[i].id === idCategorie)
        result = this.categoriesActivity[i].titre;
    return result;
  }

  removePhotoTmp(i: number) {
    this.imgFile.splice(i, 1);
  }

  removePhoto(i: number) {
    this.currentCompany.phototheque.splice(i, 1);
  }

  onImageChange(e: any) {
    const reader = new FileReader();

    if(e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imgFile.push(reader.result as string);
        this.uploadForm.patchValue({
          imgSrc: reader.result
        });
      };
    }
  }

  save() {
    this.isLoading = true;
    if(this.stepMake === 3) {
      if(!(this.currentCompany.nom && this.currentCompany.categorie && this.currentCompany.adresse && this.currentCompany.description && this.currentCompany.pays && this.currentCompany.ville && this.currentCompany.phone && this.currentCompany.price.length > 0)) {
        this.isLoading = false;
        this.alertService.print('One or more fields not filled in', 'warning');
      } else if(this.currentCompany.phototheque.length < 8) {
        this.isLoading = false;
        this.alertService.print('The number of photos is insufficient (8 at least)', 'warning');
      } else {
        this.currentCompany.date = new Date().toString();
        this.companyService.updateCompany(this.currentCompany).then(
          () => {
            this.isLoading = false;
            this.alertService.print('Your company was successfully created', 'success');
          }, (error) => {
            this.isLoading = false;
            this.alertService.print(error, 'danger');
          }
        );
      }
    } else {
      if(this.imgFile.length > 0) {
        let tmpTof = [];
        for(let i=0; i<this.imgFile.length; i++) {
          tmpTof.push(this.sanitizer.bypassSecurityTrustResourceUrl(this.imgFile[i]).toString());
        }
        this.apiService.addAllImageForAdresseId( 'company/' + this.currentCompany.id + '/phototheque', tmpTof).then(
          (docRef: string[]) => {
            const pointe = this;
            docRef.forEach(function (doc) {
              pointe.currentCompany.phototheque.push(doc);
            });
            this.imgFile = [];
            this.companyService.updateCompany(this.currentCompany).then(
              () => {
                this.isLoading = false;
                this.stepMake += 1;
              }, (error) => {
                this.isLoading = false;
                this.alertService.print(error, 'danger');
              }
            );
          });
      } else {
        this.companyService.updateCompany(this.currentCompany).then(
          () => {
            this.isLoading = false;
            this.stepMake += 1;
          }, (error) => {
            this.isLoading = false;
            this.alertService.print(error, 'danger');
          }
        );
      }
    }
  }

  addNewFaq() {
    this.currentCompany.faq.push(new Faq('', '', 'en'));
  }

  removeFaq(i: number) {
    this.currentCompany.faq.splice(i, 1);
  }

  addNewCompany() {
    let tmpCompany = new Company([firebase.auth().currentUser?.email as string]);
    tmpCompany.faq.push(
      Object.assign({}, new Faq('What is the minimum and maximum price of your services?', '', 'en')),
      Object.assign({}, new Faq('What services do you offer?', '', 'en')));

    this.listCompany.unshift(tmpCompany);
    this.currentCompany = tmpCompany;
    this.stepMake = 1;
  }

  goNext() {
    this.defaultTransform = this.defaultTransform - 398;
    if (Math.abs(this.defaultTransform) >= this.slider.scrollWidth / 1.7) this.defaultTransform = 0;
    this.slider.style.transform = "translateX(" + this.defaultTransform + "px)";
  }

  goPrev() {

    if (Math.abs(this.defaultTransform) === 0) this.defaultTransform = 0;
    else this.defaultTransform = this.defaultTransform + 398;
    this.slider.style.transform = "translateX(" + this.defaultTransform + "px)";
  }

}
