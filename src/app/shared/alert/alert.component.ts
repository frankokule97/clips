import {Component, OnInit, Input} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-alert',
  imports: [
    NgClass
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent implements OnInit {

  @Input() color = 'blue';

  get bgColor() {
    return `bg-${this.color}-400`;
  }

  constructor() {}

  ngOnInit() {

  }
}
