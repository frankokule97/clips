import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tab',
  imports: [],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css'
})
export class TabComponent implements OnInit {

  @Input() tabTitle = '';
  @Input() active = false;

  constructor() { }

  ngOnInit() {

  }

}
