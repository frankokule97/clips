import {Component} from '@angular/core';
import {NavComponent} from './nav/nav.component';
import {AuthModalComponent} from './user/auth-modal/auth-modal.component';
import {AuthService} from './services/auth.service';
import {AsyncPipe, NgIf} from '@angular/common';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    NavComponent,
    AuthModalComponent,
    AsyncPipe,
    NgIf,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  constructor(public _auth: AuthService) {}
}
