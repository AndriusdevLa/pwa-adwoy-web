import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {  FormGroup, FormBuilder, Validators,} from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {Profile} from "../../core/profile";

type UserFields = 'email' | 'password' | 'Firstname' | 'Lastname' |  'username' |  'confirmPsw' |  'confirmTerms';


type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class UserFormComponent implements OnInit{
  userForm: FormGroup;
  newUser = true; // to toggle login or signup form
  passReset = false; // set to true when password reset is triggered
  profile = {} as Profile;
  formErrors: FormErrors = {
    'email': '',
    'password': '',
    'Firstname': '',
    'Lastname': '',
    'username': '',
    'confirmPsw': '',
    'confirmTerms': '',
  };
  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'email': 'Email must be a valid email',
    },
    'password': {
      'required': 'Password is required.',
      'pattern': 'Password must be include at one letter and one number.',
      'minlength': 'Password must be at least 4 characters long.',
      'maxlength': 'Password cannot be more than 40 characters long.',
    },
    'Firstname': {
      'required': 'First name is required',
    },
    'Lastname': {
      'required': 'Last name is required',
    },
    'username': {
      'required': 'Username is required',
    },
    'confirmPsw': {
      'required': 'Passwords must match',
    },
    'confirmTerms': {
      'required': 'You must accept our Terms',
    },
  };

  constructor(private fb: FormBuilder, private auth: AuthService,
              private afDatabase: AngularFireDatabase,
              private aFAuth: AngularFireAuth,) { }

  ngOnInit() {
    this.buildForm();
  }

  toggleForm() {
    this.newUser = !this.newUser;
  }

  signup() {
    this.auth.emailSignUp(this.userForm.value['email'], this.userForm.value['password']);
  }

  login() {
    this.auth.emailLogin(this.userForm.value['email'], this.userForm.value['password']);
  }

  resetPassword() {
    this.auth.resetPassword(this.userForm.value['email'])
      .then(() => this.passReset = true);
  }

  buildForm() {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email,
      ]],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
      ]],
      'Firstname': ['', [
        Validators.required,
      ]],
      'Lastname': ['', [
        Validators.required,
      ]],
      'username': ['', [
        Validators.required,

      ]],
      'confirmPsw': ['', [
        Validators.required,
      ]],
      'confirmTerms': ['', [
        Validators.required,
      ]],
    });

    this.userForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    if (!this.userForm) { return; }
    const form = this.userForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field) && (field === 'email' || field === 'password' || field === 'Firstname' || field === 'Lastname' || field === 'username' || field === 'confirmPsw' || field === 'confirmTerms')) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          if (control.errors) {
            for (const key in control.errors) {
              if (Object.prototype.hasOwnProperty.call(control.errors, key) ) {
                this.formErrors[field] += `${(messages as {[key: string]: string})[key]} `;
              }
            }
          }
        }
      }
    }
  }
  updateProfile(){
    this.aFAuth.authState.subscribe(auth => {
      this.afDatabase.object(`profile/${auth && auth.email && auth.uid}`).update(this.profile)
    })

  }
}


