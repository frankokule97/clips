import { Injectable } from '@angular/core';
import { Firestore, setDoc, doc } from '@angular/fire/firestore'; //using this instead of /compat... (it was causing inject() error)
import { Auth, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from '@angular/fire/auth'; //using this instead of /compat... (it was causing inject() error)
import IUser from '../models/user.model';
import { updateProfile } from '@angular/fire/auth';
import {BehaviorSubject, delay, Observable, filter, map, switchMap, of} from 'rxjs';
import { User } from 'firebase/auth'
import { Router } from '@angular/router';
import { ActivatedRoute, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // undefined: auth state not determined yet;
  // null: definitely not logged in;
  // User: logged in.

  private _user= new BehaviorSubject<User | null | undefined>(undefined);
  public user$ = this._user.asObservable();
  public isAuthenticatedWithDelay$: Observable<any>;
  public redirect = false;

  constructor(
    public _signOut: Auth,
    private _auth: Auth,
    private _db: Firestore,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    onAuthStateChanged(this._auth, (user) => {
       this._user.next(user);
    });
    this.isAuthenticatedWithDelay$ = this.user$.pipe(
      delay(1000)
    )
    this._router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map((e) => this._route.firstChild),
      switchMap( route => route?.data ?? of({ authOnly: false }))
    ).subscribe((data) => {
      this.redirect = data.authOnly ?? false;
    });
  }

  public async createUser(userData: IUser) {
    if (!userData.password) {
      throw new Error('Password not provided!');
    }

    const userCred = await createUserWithEmailAndPassword(
      this._auth, userData.email as string, userData.password as string
    )

    if(!userCred.user) {
      throw new Error('User not found!');
    }

    await setDoc(doc(this._db, 'users', userCred.user.uid), {
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber,
    });

    await updateProfile(userCred.user, {
      displayName: userData.name,
    });
  }

    async logout($event?: Event) {
      if($event) {
        $event.preventDefault();
      }
      await signOut(this._signOut);

      if (this.redirect) {
        await this._router.navigateByUrl('/');
      }
    }

}
