import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, DocumentReference, CollectionReference, query, where, getDocs, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import IClip from '../models/clip.model';
import { clipConverter } from '../models/clip-converter';
import { of, switchMap, map, from } from 'rxjs';
import { Auth, authState } from '@angular/fire/auth';
import { Storage, deleteObject, ref } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ClipService {

  public collectionOfClips: CollectionReference<IClip>;

  constructor(
    private _firestore: Firestore,
    private _auth: Auth,
    private _storage: Storage,
  ) {
    this.collectionOfClips = collection(this._firestore, 'clips').withConverter(clipConverter) as CollectionReference<IClip>;
  }

  createClip(data: IClip): Promise<DocumentReference<IClip>> {
    const clipsCollection = collection(this._firestore, 'clips').withConverter(clipConverter) as CollectionReference<IClip>;
    return addDoc(clipsCollection, data);
  }

  getUserClips() {
    return authState(this._auth).pipe(
      switchMap(user => {
        if (!user) {
          return of([]);
        }
        const q = query(this.collectionOfClips, where('uid', '==', user.uid));
        return from(getDocs(q)).pipe(
          map(snapshot => snapshot.docs.map(doc => ({
            docId: doc.id,
            ...doc.data()
          })))
        );
      })
    );
  }

  updateClip(id: string, title: string) {
    const clipDocRef = doc(this._firestore, 'clips', id).withConverter(clipConverter);
    return updateDoc(clipDocRef, { title });
  }

  async deleteClip(clip: IClip): Promise<void> {
    // Create a reference to the file in Firebase Storage
    const fileRef = ref(this._storage, `clips/${clip.fileName}`);

    // Delete the storage document
    await deleteObject(fileRef);

    // Create a reference to the document in Firestore
    const clipDocRef = doc(this._firestore, 'clips', clip.docId!);

    // Delete the Firestore document
    await deleteDoc(clipDocRef);
  }

}
