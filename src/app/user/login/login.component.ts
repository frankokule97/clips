import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {AlertComponent} from '../../shared/alert/alert.component';

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
export class LoginComponent {

  showAlert = false;
  alertMsg = 'Please wait! Your account is being created.';
  alertColor = 'red';

  credentials= {
    email: '',
    password: ''
  };

  login() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! Your account is being created.';
    this.alertColor = 'blue';
  }

}
