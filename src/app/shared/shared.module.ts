import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import {TabsContainerComponent} from './tabs-container/tabs-container.component';
import {TabComponent} from './tab/tab.component';
import {InputComponent} from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';


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
  ],
  exports: [
    ModalComponent,
    InputComponent,
    TabsContainerComponent,
    TabComponent,
  ],
})
export class SharedModule { }
