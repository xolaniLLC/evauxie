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
import {ToolsService} from "../../services/tools.service";

@Component({
  selector: 'app-vitrine-vendor',
  templateUrl: './vitrine-vendor.component.html',
  styleUrls: ['./vitrine-vendor.component.scss']
})
export class VitrineVendorComponent implements OnInit {

  slider: any;
  defaultTransform: any;
  listCompany: Company[] = [];
  currentCompany: any;
  stepMake = 0;
  imgFile: any;
  imgProfilFile: any;
  uploadForm = this.formBuilder.group({
    file: [''],
    fileProfil: ['']
  });
  isLoading = false;
  isLoadingCompany = true;
  categoriesActivity: CategorieActivite[] = [];
  sousMenu = 1;
  isUploadLogoProfil = false;
  isUploadPhototeque = false;
  sousCategorisActivity: CategorieActivite[] = [];

  constructor(private router: Router, private userService: UserService, private categorieService: CategoriesService, private alertService: AlertService, private companyService: CompanyService, private sanitizer: DomSanitizer, private formBuilder: FormBuilder, private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.userService.getInfosUserWitchId(firebase.auth().currentUser?.email).then(
      (val) => {
        if(val.typeUtilisateur === 'vendor') {
          this.slider = document.getElementById("slider");
          this.defaultTransform=0;

          this.companyService.getCompanies().then(
            (docRef) => {
              this.isLoadingCompany = false;
              for(let i=0; i<docRef.length; i++) {
                if(!docRef[i].date)
                  this.listCompany.unshift(docRef[i]);
                else
                  this.listCompany.push(docRef[i]);

                if(i === docRef.length - 1) {
                  this.currentCompany = this.listCompany[0];
                  this.categorieService.getCategorieWitchId(this.currentCompany.categorie).then(
                    (mmm) => {
                      if(mmm.parent) {
                        this.getSousCategorieElement(mmm.parent);
                      }
                    }
                  );
                  this.categorieService.getCategoriesActivites().then(
                    (data) => {
                      const pointe = this;
                      data.forEach(function (doc) {
                        pointe.categoriesActivity.push(doc);
                      });
                    }
                  );
                }
              }

            }
          );
        } else {
          this.router.navigateByUrl('../company-management');
        }
      }
    );
  }

  getSousCategorieElement(idCategorie: string) {
    if(idCategorie) {
      this.sousCategorisActivity = [];
      this.categorieService.getSousCategoriesActivites(idCategorie).then(
        (data) => {
          this.sousCategorisActivity = data;
        }
      );
    }
  }

  recupNomCategorie(idCategorie: string) {
    let result = '';
    for(let i=0; i<this.categoriesActivity.length; i++)
      if(this.categoriesActivity[i].id === idCategorie)
        result = this.categoriesActivity[i].titre;
    return result;
  }

  removePhoto(i: number) {
    this.currentCompany.phototheque.splice(i, 1);
  }

  definePrimaryPicture(i: number) {
    const tmp1 = this.currentCompany.phototheque[i];
    const tmp2 = this.currentCompany.phototheque[0];
    this.currentCompany.phototheque[0] = tmp1;
    this.currentCompany.phototheque[i] = tmp2;
  }

  onImageChange(e: any) {
    const reader = new FileReader();

    if(e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imgFile = reader.result as string;
        const gid = new ToolsService();
        const tmpName = gid.generateId(23);
        this.isUploadPhototeque = true;
        this.apiService.addImageForAdresseId(tmpName.toString(), 'company/' + this.currentCompany.id + '/logo', this.sanitizer.bypassSecurityTrustResourceUrl(this.imgFile).toString()).then(
          (roaning) => {
            this.currentCompany.phototheque.push(roaning);
            this.isUploadPhototeque = false;
          }
        )
        this.uploadForm.patchValue({
          imgSrc: reader.result
        });
      };
    }
  }

  onImageProfilChange(e: any) {

    const reader = new FileReader();

    if(e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imgProfilFile = reader.result as string;
        const gid = new ToolsService();
        const tmpName = gid.generateId(23);
        this.isUploadLogoProfil = true;
        this.apiService.addImageForAdresseId(tmpName.toString(), 'company/' + this.currentCompany.id + '/phototheque', this.sanitizer.bypassSecurityTrustResourceUrl(this.imgProfilFile).toString()).then(
          (roaning) => {
            this.currentCompany.logo = roaning;
            this.isUploadLogoProfil = false;
          }
        )
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
