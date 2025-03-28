import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoRoutingModule } from './video-routing.module';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    VideoRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class VideoModule { }
