import {Component, OnInit} from '@angular/core';
import {ModalService} from '../services/modal.service';
import {AuthService} from '../services/auth.service';
import {AsyncPipe, NgIf} from '@angular/common';
import { signOut } from '@angular/fire/auth';
import { Auth } from '@angular/fire/auth';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [NgIf, AsyncPipe, RouterLink],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public isUserLoggedIn = false;

  constructor(
    public _modal: ModalService,
    public _auth: AuthService,
    public _signOut: Auth,
  ) {}

  ngOnInit(): void {}

  openModal(event: Event) {
    event.preventDefault();

    this._modal.toggleModal('auth');
  }

  async logout($event: Event) {
    $event.preventDefault();
    await signOut(this._signOut);
  }

}
