import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import {TabsContainerComponent} from './tabs-container/tabs-container.component';
import {TabComponent} from './tab/tab.component';
import {InputComponent} from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask, provideEnvironmentNgxMask } from 'ngx-mask';
import {AlertComponent} from './alert/alert.component';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ModalComponent,
    TabsContainerComponent,
    TabComponent,
    InputComponent,
    ReactiveFormsModule,
    NgxMaskDirective,
    AlertComponent
  ],
  exports: [
    ModalComponent,
    InputComponent,
    TabsContainerComponent,
    TabComponent,
    NgxMaskDirective,
  ],
  providers: [
    provideNgxMask(),
    provideEnvironmentNgxMask(),
  ]
})
export class SharedModule { }
