import { Component, OnInit } from '@angular/core';

import { UploadService } from '../shared/upload.service';
import { Upload } from '../shared/upload';

import { Observable } from 'rxjs/Observable';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {AuthService} from "../../core/auth.service";

@Component({
  selector: 'uploads-list',
  templateUrl: './uploads-list.component.html',
  styleUrls: ['./uploads-list.component.scss'],
})
export class UploadsListComponent implements OnInit {

  uploads: Observable<Upload[]>;

  showSpinner = true;
  constructor(private upSvc: UploadService,
              ) {

  }

  ngOnInit() {
    this.uploads = this.upSvc.getUploads();
    console.log("upload list upload :")
    this.uploads.subscribe(() => this.showSpinner = false);
  }
}
