import { Component, OnInit } from '@angular/core';
import {CategoriesService} from "../../services/categories.service";
import {CategorieActivite} from "../../models/categorie-activite";
import {Location} from '@angular/common';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-filtre',
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.scss']
})
export class FiltreComponent implements OnInit {

  categories: CategorieActivite[] = [];
  isLoadingCat = true;
  viewCat = true;
  categorieSelect = '';

  viewAffordbility = true;
  affordbilitySelect = '';

  viewTown = true;
  isLoadingTown = false;
  towns: any[] = [];
  townSelect = '';

  viewRating = true;
  ratingSelect = 0;

  constructor(private activatedRoute: ActivatedRoute, private categoryService: CategoriesService, private location: Location) { }

  ngOnInit(): void {
    this.categoryService.getAllCategoriesActivites().then(
      (data) => {
        this.isLoadingCat = false;
        this.categories = data;
      }
    );
    this.towns = [
      {
        "city": "Douala",
        "lat": "4.0500",
        "lng": "9.7000",
        "country": "Cameroon",
        "iso2": "CM",
        "admin_name": "Littoral",
        "capital": "admin",
        "population": "2446945",
        "population_proper": "2446945"
      },
      {
        "city": "Yaoundé",
        "lat": "3.8578",
        "lng": "11.5181",
        "country": "Cameroon",
        "iso2": "CM",
        "admin_name": "Centre",
        "capital": "primary",
        "population": "2440462",
        "population_proper": "2440462"
      },
      {
        "city": "Maroua",
        "lat": "10.5823",
        "lng": "14.3275",
        "country": "Cameroon",
        "iso2": "CM",
        "admin_name": "Extrême-Nord",
        "capital": "admin",
        "population": "319941",
        "population_proper": "201371"
      },
      {
        "city": "Bafoussam",
        "lat": "5.4667",
        "lng": "10.4167",
        "country": "Cameroon",
        "iso2": "CM",
        "admin_name": "Ouest",
        "capital": "admin",
        "population": "290768",
        "population_proper": "290768"
      },
      {
        "city": "Bamenda",
        "lat": "5.9333",
        "lng": "10.1667",
        "country": "Cameroon",
        "iso2": "CM",
        "admin_name": "North-West",
        "capital": "admin",
        "population": "269530",
        "population_proper": "269530"
      },
      {
        "city": "Garoua",
        "lat": "9.3000",
        "lng": "13.4000",
        "country": "Cameroon",
        "iso2": "CM",
        "admin_name": "Nord",
        "capital": "admin",
        "population": "235996",
        "population_proper": "235996"
      },
      {
        "city": "Ngaoundéré",
        "lat": "7.3214",
        "lng": "13.5839",
        "country": "Cameroon",
        "iso2": "CM",
        "admin_name": "Adamaoua",
        "capital": "admin",
        "population": "189800",
        "population_proper": "189800"
      },
      {
        "city": "Bertoua",
        "lat": "4.5833",
        "lng": "13.6833",
        "country": "Cameroon",
        "iso2": "CM",
        "admin_name": "Est",
        "capital": "admin",
        "population": "173000",
        "population_proper": "173000"
      },
      {
        "city": "Buea",
        "lat": "4.1667",
        "lng": "9.2333",
        "country": "Cameroon",
        "iso2": "CM",
        "admin_name": "South-West",
        "capital": "admin",
        "population": "131325",
        "population_proper": "131325"
      },
      {
        "city": "Ébolowa",
        "lat": "2.9000",
        "lng": "11.1500",
        "country": "Cameroon",
        "iso2": "CM",
        "admin_name": "Sud",
        "capital": "admin",
        "population": "87875",
        "population_proper": "79500"
      }
    ];

    this.categorieSelect = this.activatedRoute.snapshot.queryParams['categorie'] ? this.activatedRoute.snapshot.queryParams['categorie'] : '';
    this.affordbilitySelect = this.activatedRoute.snapshot.queryParams['affordbility'] ? this.activatedRoute.snapshot.queryParams['affordbility'] : '';
    this.townSelect = this.activatedRoute.snapshot.queryParams['ville'] ? this.activatedRoute.snapshot.queryParams['ville'] : '';
    this.ratingSelect = this.activatedRoute.snapshot.queryParams['rating'] ? Number(this.activatedRoute.snapshot.queryParams['rating']) : 0;
  }

  updateCurrentLink(param: string, valeur: string) {
    if(this.location.path().includes(param)) {
      this.location.replaceState(this.location.path().replace(param + '=', 'oldParam'));
    }
    this.location.replaceState(this.location.path() + (this.location.path().includes('?') ? '&' : '?') + param + '=' + valeur);
    location.reload();
  }

}
