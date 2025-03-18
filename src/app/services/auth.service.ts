import { Injectable } from '@angular/core';
import {Firestore, setDoc, doc} from '@angular/fire/firestore'; //using this instead of /compat... (it was causing inject() error)
import {Auth, createUserWithEmailAndPassword, onAuthStateChanged} from '@angular/fire/auth'; //using this instead of /compat... (it was causing inject() error)
import IUser from '../models/user.model';
import { updateProfile} from '@angular/fire/auth';
import {BehaviorSubject} from 'rxjs';
import { User } from 'firebase/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // undefined: auth state not determined yet;
  // null: definitely not logged in;
  // User: logged in.

  private _user= new BehaviorSubject<User | null | undefined>(undefined);
  public user$ = this._user.asObservable();

  constructor(
    private _auth: Auth,
    private _db: Firestore
  ) {

    onAuthStateChanged(this._auth, (user) => {
       this._user.next(user);
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

}
