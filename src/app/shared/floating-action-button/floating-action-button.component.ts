import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-floating-action-button',
  templateUrl: './floating-action-button.component.html',
  styleUrls: ['./floating-action-button.component.scss']
})
export class FloatingActionButtonComponent implements OnInit {

  currentLangue = '';
  inFocus = false;

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
    this.currentLangue = localStorage.getItem('language') ? localStorage.getItem('language') as string : this.translate.getDefaultLang();
  }

  translateLanguageTo(lang: string) {
    this.translate.use(lang);
    this.currentLangue = lang;
    localStorage.setItem('language', lang);
  }

}
