import {Component, OnInit, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {NgIf} from '@angular/common';
import {AlertComponent} from '../../shared/alert/alert.component';
import { Auth } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    NgIf,
    AlertComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm') loginForm!: NgForm;

  showAlert = false;
  alertMsg = 'Please wait! We are logging you in.';
  alertColor = 'blue';
  inSubmission = false;

  constructor(
    public _auth: Auth,
    public _modal: ModalService,
  ) {}

  ngOnInit() {
    this._modal.resetForm$.subscribe(() => {
      if (this.loginForm) {
        this.loginForm.resetForm();
      }
      // Optionally reset credentials as well
      this._modal.credentials = { email: '', password: '' };
    });
  }

   async login() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! We are logging you in.';
    this.alertColor = 'blue';
    this.inSubmission = true;

    try {
      await signInWithEmailAndPassword(this._auth, this._modal.credentials.email, this._modal.credentials.password );
    } catch (e) {
        this.inSubmission = false;
        this.alertMsg = 'An unexpected error occurred. Please try again later.';
        this.alertColor = 'red';

        return;
    }

    this.alertMsg = 'Success! You are now logged in.';
    this.alertColor = 'green';
     this.loginForm.resetForm();
  }

}
