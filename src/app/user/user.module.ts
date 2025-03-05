import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    AuthModalComponent,
    SharedModule
  ],
  exports: [
    AuthModalComponent,
  ]
})
export class UserModule { }
