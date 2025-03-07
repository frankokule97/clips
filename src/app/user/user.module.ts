import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    AuthModalComponent,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    AuthModalComponent,
  ]
})
export class UserModule { }
