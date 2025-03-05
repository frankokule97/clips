import { Component, AfterContentInit, ContentChildren, QueryList } from '@angular/core';
import {TabComponent} from '../tab/tab.component';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-tabs-container',
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './tabs-container.component.html',
  styleUrl: './tabs-container.component.css'
})
export class TabsContainerComponent implements AfterContentInit {

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent> = new QueryList();

  constructor() {
  }

  ngAfterContentInit() {
    const activeTabs = this.tabs.filter(
      tab => tab.active
    )

    if (!activeTabs || activeTabs.length === 0) {
      this.selectTab(this.tabs!.first)
    }
  }

  selectTab(tab: TabComponent) {
    this.tabs?.forEach(tab => {
      tab.active = false;
    })

    tab.active = true;

    return false;
  }

}
