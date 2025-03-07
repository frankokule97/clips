import {Component, OnInit} from '@angular/core';
import {ModalService} from '../services/modal.service';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  constructor(public modal: ModalService) { }

  ngOnInit(): void {

  }

  openModal(event: Event) {
    event.preventDefault();

    this.modal.toggleModal('auth');
  }

}
