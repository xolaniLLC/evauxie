import { Component, OnInit } from '@angular/core';
import {CompanyService} from "../../services/company.service";
import {Company} from "../../models/company";
import {AvisCompanyService} from "../../services/avis-company.service";
import {AvisCompany} from "../../models/avis-company";

@Component({
  selector: 'app-review-vendor',
  templateUrl: './review-vendor.component.html',
  styleUrls: ['./review-vendor.component.scss']
})
export class ReviewVendorComponent implements OnInit {

  currentCompany: Company | any;
  avisCurrentCompany: AvisCompany[] = [];
  isLoading = false;

  constructor(private companyService: CompanyService, private avisCompanyService: AvisCompanyService) { }

  ngOnInit(): void {
    this.companyService.getCompanies().then(
      (docRef) => {
        for(let i=0; i<docRef.length; i++) {
          if(docRef[i].date) {
            this.currentCompany = docRef[i];

            this.avisCompanyService.getAvisWitchIdCompany(this.currentCompany.id).then(
              (docRef) => {
                this.avisCurrentCompany = docRef;
              }
            );
          }
        }
      });
  }

  repAvis(i: any, avis: AvisCompany) {
    this.isLoading = true;
    const elt: any = (document.getElementById('input_rep_' + i.toString()) as HTMLDivElement | null);
    avis.reponseCompany = elt.value;
    this.avisCompanyService.updateAvis(avis).then(
      () => {
        this.isLoading = false;
      }
    );
  }

}
