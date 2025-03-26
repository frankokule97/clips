import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Observable, from, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    // Create a promise that resolves with the auth state.
    return from(
      new Promise<boolean | UrlTree>((resolve) => {
        const unsubscribe = this.auth.onAuthStateChanged(user => {
          unsubscribe();
          if (user) {
            resolve(true);
          } else {
            // Redirect unauthorized users to the home page
            resolve(this.router.parseUrl('/'));
          }
        });
      })
    );
  }
}

