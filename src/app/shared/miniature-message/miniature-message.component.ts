import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from "../../services/message.service";
import {Message} from "../../models/message";

@Component({
  selector: 'app-miniature-message',
  templateUrl: './miniature-message.component.html',
  styleUrls: ['./miniature-message.component.scss']
})
export class MiniatureMessageComponent implements OnInit {

  @Input() idMessage: any;
  currentMessage: any | Message = null;
  printDetailReponse = false;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messageService.getMessageWitchId(this.idMessage).then(
      (result) => {
        this.currentMessage = result;
      }
    );
  }

  epureText(text: string) {
    let result = text;
    if((text.split('#').length - 1) > 1 && text.includes('@')) {
      result = text.substring(0, text.indexOf('#'));
    }
    return result;
  }

}
