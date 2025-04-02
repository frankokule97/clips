import { FirestoreDataConverter, DocumentData, QueryDocumentSnapshot } from '@angular/fire/firestore';
import IClip from '../models/clip.model';

export const clipConverter: FirestoreDataConverter<IClip> = {
  toFirestore(clip: IClip): DocumentData {
    return { ...clip };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options): IClip {
    const data = snapshot.data(options);
    return data as IClip;
  }
};
