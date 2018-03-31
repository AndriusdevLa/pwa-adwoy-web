import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '../../shared/shared.module';

import { NavService } from './nav.service';

import { UserLoginComponent } from '../user-login/user-login.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { TopNavComponent } from '../top-nav/top-nav.component';
import { FooterNavComponent } from '../footer-nav/footer-nav.component';
import { ReadmePageComponent } from '../readme-page/readme-page.component';
import { NotificationMessageComponent } from '../notification-message/notification-message.component';
import {AppMaterialModule} from "../../app-material/app-material.module";
import {UploadModule} from "../../uploads/shared/upload.module";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireDatabase} from "angularfire2/database-deprecated";



@NgModule({
  imports: [
    AppMaterialModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    UploadModule,

  ],
  declarations: [
    UserLoginComponent,
    UserProfileComponent,
    TopNavComponent,
    FooterNavComponent,
    UserFormComponent,
    ReadmePageComponent,
    NotificationMessageComponent,


  ],
  exports: [
    TopNavComponent,
    FooterNavComponent,
    UserProfileComponent,
    NotificationMessageComponent,
  ],
  providers: [
    AngularFireDatabase
  ],
})
export class UiModule { }
