import {Component, OnInit} from '@angular/core';

import { Observable } from "rxjs/Observable";
import {AuthService} from "../../core/auth.service";
import {FormControl} from "@angular/forms";
import {Profile} from "../../core/profile";
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2/database-deprecated";
import {AngularFireAuth} from "angularfire2/auth";

@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
  stateCtrl: FormControl;
  show = false;
  profileData: FirebaseObjectObservable<Profile>
  toggleCollapse() {
    this.show = !this.show;
  }
  constructor(
              public auth: AuthService,
              private firebaseAuth: AngularFireAuth,
              private afDatabase: AngularFireDatabase,
     ) {
    this.stateCtrl = new FormControl();

  }
  logout() {
    this.auth.signOut();
  }
  getProfile(){
    this.firebaseAuth.authState.subscribe(data => {
      if(data && data.email && data.uid) {
        this.profileData = this.afDatabase.object(`profile/${data.uid}`)
        console.log("Gaunami profilio duomenys")
      }
      else {
        console.log("Neprisijunges - profilis nematomas")
      }

    })
  }
  ngOnInit() {
this.getProfile()
  }

}
