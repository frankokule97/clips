import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { InputComponent } from '../../shared/input/input.component';
import { AlertComponent } from '../../shared/alert/alert.component';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import IUser from '../../models/user.model';
import { RegisterValidators } from '../validators/register-validators';
import { EmailTaken } from '../validators/email-taken';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-register',
  imports: [
    InputComponent,
    AlertComponent,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  // registerForm!: FormGroup;
  inSubmission = false;
  showAlert = false;
  alertMsg = 'Please wait! Your account is being created.';
  alertColor = 'blue';

  constructor(
    private fb: FormBuilder,
    private _auth: AuthService,
    private _emailTaken: EmailTaken,
    public _modal: ModalService,
  ) {
    this._modal.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['',
        [Validators.required, Validators.email],
        [this._emailTaken.validate.bind(this._emailTaken)]
      ],
      age: [null, [Validators.required, Validators.min(18), Validators.max(120)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)]],
      confirmPassword: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(13)]]
    }, {
      validators: [RegisterValidators.match('password', 'confirmPassword')]
    });
  }

  get nameControl() {
    return this._modal.registerForm.get('name') as FormControl;
  }

  get emailControl() {
    return this._modal.registerForm.get('email') as FormControl;
  }

  get ageControl() {
    return this._modal.registerForm.get('age') as FormControl;
  }

  get passwordControl() {
    return this._modal.registerForm.get('password') as FormControl;
  }
  get confirmPasswordControl() {
    return this._modal.registerForm.get('confirmPassword') as FormControl;
  }

  get phoneNumberControl() {
    return this._modal.registerForm.get('phoneNumber') as FormControl;
  }

  async register() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! Your account is being created.';
    this.alertColor = 'blue';
    this.inSubmission = true;

    try {
      await this._auth.createUser(this._modal.registerForm.value as IUser);
    } catch (e) {
      this.alertMsg = 'An unexpected error occurred. Please try again later.';
      this.alertColor = 'red';
      this.inSubmission = false;
      return;
    }

    this.alertMsg = 'Success! Your account has been created.';
    this.alertColor = 'green';
  }
}

