import {Component, OnInit} from '@angular/core';
import {ModalService} from '../services/modal.service';
import {AuthService} from '../services/auth.service';
import {AsyncPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [
    NgIf,
    AsyncPipe
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  public isUserLoggedIn = false;

  constructor(
    public _modal: ModalService,
    public _auth: AuthService,
  ) {
    this._auth.user$.subscribe(user => {
      if (user) {
        this.isUserLoggedIn = true;
      }
    })
  }

  ngOnInit(): void {

  }

  openModal(event: Event) {
    event.preventDefault();

    this._modal.toggleModal('auth');
  }

}
