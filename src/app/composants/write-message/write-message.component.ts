import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-write-message',
  templateUrl: './write-message.component.html',
  styleUrls: ['./write-message.component.scss']
})
export class WriteMessageComponent implements OnInit {

  @Input() destinataires: string | any;
  @Input() texteBoutton = '';

  constructor() { }

  ngOnInit(): void {
  }

  send(form: any) {

  }

}
