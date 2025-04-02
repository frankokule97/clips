import { Timestamp, FieldValue } from 'firebase/firestore';

export default interface IClip {
  docId?: string;
  uid: string;
  displayName: string;
  title: string;
  fileName: string;
  url: string;
  timestamp: Timestamp | FieldValue;
}
