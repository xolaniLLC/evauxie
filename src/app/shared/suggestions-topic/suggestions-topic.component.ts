import {Component, Input, OnInit} from '@angular/core';
import {Topic} from "../../models/topic";
import {ForumService} from "../../services/forum.service";

@Component({
  selector: 'app-suggestions-topic',
  templateUrl: './suggestions-topic.component.html',
  styleUrls: ['./suggestions-topic.component.scss']
})
export class SuggestionsTopicComponent implements OnInit {

  @Input() skin = 'lateral';
  listeTopics: Topic[] = [];
  isLoading = true;

  constructor(private forumService: ForumService) { }

  ngOnInit(): void {
    this.forumService.getTopics().then(
      (result) => {
        this.isLoading =false;
        let pointe = this;
        result.forEach(function (doc) {
          pointe.listeTopics.push(doc);
        });
      }
    );
  }

  extractTextPure(text: string) : string {
    const element: HTMLElement = document.createElement('tmpConvert') as HTMLElement
    element.innerHTML = text;
    return element.textContent as string;
  }

  extractImage(brute: string) {
    let result = '';
    let e1 = brute.split('img src="');
    if(e1.length > 1) {
      result = e1[1].split('"')[0];
    }
    return result;
  }

}
