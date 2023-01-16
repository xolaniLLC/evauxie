import {Component, Input, OnInit} from '@angular/core';
import {Utilisateur} from "../../models/utilisateur";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-miniature-name-user',
  templateUrl: './miniature-name-user.component.html',
  styleUrls: ['./miniature-name-user.component.scss']
})
export class MiniatureNameUserComponent implements OnInit {

  @Input() idUser: string = '';
  currentUser: Utilisateur | any;

  constructor(private utilisateurService: UserService) { }

  ngOnInit(): void {
    if(this.idUser) {
      this.utilisateurService.getInfosUserWitchId(this.idUser).then(
        (data) => {
          this.currentUser = data;
        }
      );
    }
  }

}
