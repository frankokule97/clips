import { Component, OnInit, Input } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {NgxMaskDirective, provideNgxMask} from 'ngx-mask';

@Component({
  selector: 'app-input',
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    NgxMaskDirective,
  ],
  providers: [
    provideNgxMask(),
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent implements OnInit {
  @Input() control: FormControl = new FormControl();
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() format = '';

  constructor() {}

  ngOnInit() {

  }

}
