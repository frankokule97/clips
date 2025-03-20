import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmailTaken implements AsyncValidator {
  constructor(
    private db: Firestore,
  ) {}

  async validate(control: AbstractControl): Promise<ValidationErrors | null> {
    if (!control.value) {
      return Promise.resolve(null);
    }

    const q = query(collection(this.db, 'users'), where('email', '==', control.value));
    const snapshot = await getDocs(q);
    return snapshot.size > 0 ? { emailTaken: true } : null;
  }
}

