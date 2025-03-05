import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import {TabsContainerComponent} from './tabs-container/tabs-container.component';
import {TabComponent} from './tab/tab.component';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ModalComponent,
    TabsContainerComponent,
    TabComponent,
  ],
  exports: [
    ModalComponent,
  ],
})
export class SharedModule { }
