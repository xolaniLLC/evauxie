import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Utilisateur} from "../../models/utilisateur";

@Component({
  selector: 'app-miniature-profil-user',
  templateUrl: './miniature-profil-user.component.html',
  styleUrls: ['./miniature-profil-user.component.scss']
})
export class MiniatureProfilUserComponent implements OnInit {

  @Input() idUser: any;
  @Input() skin: string = 'circle';
  currentUser: Utilisateur | any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getInfosUserWitchId(this.idUser).then(
      (data) => {
        this.currentUser = data;
      }
    );
  }

}
