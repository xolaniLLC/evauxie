import {Component, Input, OnInit} from '@angular/core';
import {Utilisateur} from "../../models/utilisateur";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-miniature-avatar-user',
  templateUrl: './miniature-avatar-user.component.html',
  styleUrls: ['./miniature-avatar-user.component.scss']
})
export class MiniatureAvatarUserComponent implements OnInit {

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
