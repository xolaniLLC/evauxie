import { Component, OnInit } from '@angular/core';
import {CategoriesService} from "../services/categories.service";
import {CategorieActivite} from "../models/categorie-activite";
import {AlertService} from "../services/alert.service";
import {UserService} from "../services/user.service";
import firebase from "firebase";
import {CompanyService} from "../services/company.service";
import {Company} from "../models/company";
import {WriteMailService} from "../services/write-mail.service";
import {Location} from "@angular/common";
import {GroupForum} from "../models/group-forum";
import {TranslateService} from "@ngx-translate/core";
import {BlogService} from "../services/blog.service";
import {Blog} from "../models/blog";
import {GroupBlog} from "../models/group-blog";
import {Topic} from "../models/topic";

@Component({
  selector: 'app-e-admin',
  templateUrl: './e-admin.component.html',
  styleUrls: ['./e-admin.component.scss']
})
export class EAdminComponent implements OnInit {

  categoriesActivity: CategorieActivite[] = [];
  groupeForum: GroupForum[] = [];
  groupeBlog: GroupBlog[] = [];
  companyVerified: Company[] = [];
  companyNoVerified: Company[] = [];
  isLoadCat = true;
  isLoadGF = true;
  isLoadGB = true;
  isLoadCom = true;
  isAdmin = -1;
  menu = 1;
  isLoadSaveCat = false;
  isLoadSaveGF = false;
  isLoadSaveGB = false;
  isLoadingSaveBlog = false;
  isLoadBlog = false;
  blogs: Blog[] = [];
  currentBlog!: any;
  printInfos: string[] = [];

  constructor(private blogService: BlogService, private translate: TranslateService, private location: Location, private writeService: WriteMailService, private companyService: CompanyService, private userService: UserService, private alertService: AlertService, private categorieService: CategoriesService) { }

  ngOnInit(): void {
    this.userService.getInfosUserWitchId(firebase.auth().currentUser?.email).then(
      (donnee) => {
        if(['mexapaul53@gmail.com', 'duplexetchoffo@gmail.com', 'ladywendy910@yahoo.fr', 'wendydackaml@gmail.com'].includes(donnee.email)) {
          this.isAdmin = 1;

          this.categorieService.getAllCategoriesActivites().then(
            (data) => {
              this.isLoadCat = false;
              this.categoriesActivity = data;
            }
          );

          this.categorieService.getAllGroupForumActivites().then(
            (data) => {
              this.isLoadGF = false;
              this.groupeForum = data;
            }
          );

          this.categorieService.getAllGroupBlogActivites().then(
            (data) => {
              this.isLoadGB = false;
              this.groupeBlog = data;
            }
          );

          this.companyService.getAllCompanies().then(
            (data) => {
              this.isLoadCom = false;
              const pointe = this;
              data.forEach(function (doc) {
                if(doc.verifier) {
                  pointe.companyVerified.push(doc);
                } else { pointe.companyNoVerified.push(doc); }
              });
            }
          );

          this.blogService.getBlogs().then(
            (data) => {
              this.isLoadBlog = false;
              this.blogs = data;
            }
          );
        } else { this.isAdmin = 0; }
      }
    );
  }

  updateActionBlog(event: any) {
    this.currentBlog = event === '' ? null : this.blogs[Number(event)] as Blog;
  }

  addBlog(form: any) {
    this.isLoadingSaveBlog = true;
    const tmpBlog: Blog = new Blog(form.value.titre, form.value.contenu, firebase.auth().currentUser?.email as string, form.value.categorie, form.value.tags ? form.value.tags.split(',') : '');
    tmpBlog.id = form.value.action === '' ? tmpBlog.id : this.currentBlog.id;
    this.blogService.addNewBlog(tmpBlog).then(
      () => {
        this.isLoadingSaveBlog = false;
        this.alertService.print('Done', 'success');
      }
    );
  }

  fusionneTableau(tab1: any[], tab2: any[]) {
    return tab1.concat(tab2);
  }

  boutton_back() {
    this.location.back();
  }

  updateEtatCompany(company: Company) {
    if(company.verifier) {
      company.verifier = '';
    } else {
      company.verifier = (new Date().toString());
    }

    this.updateCompany(company);
  }

  writeEmailToUser(user: string) {
    this.writeService.new([user], '', '', '', true);
  }

  updateCompany(company: Company) {
    this.companyService.updateCompany(company).then(
      () => {
        this.alertService.print('Done', 'success');
      }
    );
  }

  getValueTraduct(texte: string, langue: string = '') {
    const wrapper = document.createElement('div');
    wrapper.innerHTML= texte;
    return wrapper.getElementsByTagName(langue ? langue : this.translate.defaultLang).length > 0 ? wrapper.getElementsByTagName(langue ? langue : this.translate.defaultLang)[0].innerHTML.replace('amp;', '')  : (texte && texte.includes('</') ? '' : texte);
  }


  addCat() {
    this.categoriesActivity.unshift(new CategorieActivite('', ''));
  }

  deleteBlog(form: any) {
    this.isLoadingSaveBlog = true;
    this.blogService.deleteBlog(this.blogs[Number(form.value.action)].id).then(
      () => {
        this.isLoadingSaveBlog = false;
        this.alertService.print('Done', 'success');
        location.reload();
      }
    );
  }

  saveCat(cat:CategorieActivite, form: any) {
    this.isLoadSaveCat = true;
    cat.titre = '<fr>' + form.value.cat_input_fr_ + '</fr>' + '<en>' + form.value.cat_input_en_ + '</en>';
    cat.parent = form.value.cat_select_parent_;
    cat.icone = form.value.cat_textarea_icone_;
    this.categorieService.addCategorie(cat).then(
      () => {
        this.isLoadSaveCat = false;
        this.alertService.print('Done', 'success');
      }
    );
  }

  saveGroup(group:GroupForum, form: any) {
    this.isLoadSaveGF = true;
    group.titre = '<fr>' + form.value.cat_input_fr_ + '</fr>' + '<en>' + form.value.cat_input_en_ + '</en>';
    group.parent = form.value.cat_select_parent_;
    group.icone = form.value.cat_textarea_icone_;
    this.categorieService.addGroupForum(group).then(
      () => {
        this.isLoadSaveGF = false;
        this.alertService.print('Done', 'success');
      }
    );
  }

  saveGroupBlog(group:GroupBlog, form: any) {
    this.isLoadSaveGB = true;
    group.titre = '<fr>' + form.value.cat_input_fr_ + '</fr>' + '<en>' + form.value.cat_input_en_ + '</en>';
    group.parent = form.value.cat_select_parent_;
    group.icone = form.value.cat_textarea_icone_;
    this.categorieService.addGroupBlog(group).then(
      () => {
        this.isLoadSaveGB = false;
        this.alertService.print('Done', 'success');
      }
    );
  }

  deleteCategorie(idCategorie: string) {
    this.isLoadSaveCat = true;
    this.categorieService.deleteCategorieActivite(idCategorie).then(
      () => {
        this.isLoadSaveCat = false;
        this.alertService.print('Done', 'success');
        this.ngOnInit();
      }
    );
  }

  addGroupForum() {
    this.groupeForum.unshift(new GroupForum('', ''));
  }

  addGroupBlog() {
    this.groupeBlog.unshift(new GroupBlog('', ''));
  }

  deleteGroupForum(idGroupForum: string) {
    this.isLoadSaveGF = true;
    this.categorieService.deleteGroupForumActivite(idGroupForum).then(
      () => {
        this.isLoadSaveGF = false;
        this.alertService.print('Done', 'success');
        this.ngOnInit();
      }
    );
  }

  deleteGroupBlog(idGroupBlog: string) {
    this.isLoadSaveGB = true;
    this.categorieService.deleteGroupBlogActivite(idGroupBlog).then(
      () => {
        this.isLoadSaveGB = false;
        this.alertService.print('Done', 'success');
        this.ngOnInit();
      }
    );
  }

}
