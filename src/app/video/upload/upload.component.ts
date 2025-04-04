import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {EventBlockerDirective} from '../../shared/directives/event-blocker.directive';
import {NgClass, NgForOf, NgIf, PercentPipe} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputComponent} from '../../shared/input/input.component';
import {Storage, ref, uploadBytesResumable, listAll, getMetadata, getDownloadURL, UploadTask} from '@angular/fire/storage';
import { v4 as uuid } from 'uuid';
import {AlertComponent} from '../../shared/alert/alert.component';
import {getAuth} from '@angular/fire/auth';
import {ClipService} from '../../services/clip.service';
import {Router} from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';
import {FfmpegService} from '../../services/ffmpeg.service';
import {SafeURLPipe} from '../pipes/safe-url.pipe';

const MAX_USAGE = 4.99 * 1024 * 1024 * 1024;

@Component({
  selector: 'app-upload',
  imports: [
    EventBlockerDirective,
    NgClass,
    NgIf,
    ReactiveFormsModule,
    InputComponent,
    AlertComponent,
    PercentPipe,
    SafeURLPipe,
    NgForOf
  ],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnDestroy {

  public isDragover = false;
  public file: File | null = null;
  public selectedFile: File | null = null;
  public nextStep = false;
  public showAlert = false;
  public alertColor = 'blue';
  public alertMsg = 'Please wait! Your clip is being uploaded.';
  public inSubmission = false;
  public percentage = 0;
  public showPercentage = false;
  public notMP4File = false;
  public uploadTask: UploadTask | null = null;
  public screenshots: string[] = [];

  public title = new FormControl('', {
    validators: [
    Validators.required,
    Validators.minLength(3)
    ],
    nonNullable: true,
  });

  public uploadForm = new FormGroup({
    title: this.title,
  });


  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private _storage: Storage,
    private _clips: ClipService,
    private _router: Router,
    public _ffmpeg: FfmpegService
  ) {
    this._ffmpeg.init();
  }

  ngOnDestroy() {
    if (this.uploadTask) {
      this.uploadTask.cancel();
      console.log('Upload canceled due to component destruction.');
    }
  }

   async storeFile($event: Event) {
    this.isDragover = false;

    this.file = ($event as DragEvent).dataTransfer?.files.item(0) ?? null;

    if(!this.file || this.file.type !== 'video/mp4') {
      this.notMP4File = true;
      this.alertColor = 'red';
      this.alertMsg = 'Upload failed! Only MP4 files under 2MB are allowed.';
      return;
    }

    this.screenshots = await this._ffmpeg.getScreenshots(this.file);

    this.title.setValue(
      this.file.name.replace(/\.[̆^/.]+$/, '')
    );

    this.nextStep = true;
    this.selectedFile = this.file;
    this.notMP4File = false;
  }

  openFileDialog(): void {
    this.fileInput.nativeElement.click();
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.file = input.files[0];
    }

    this.nextStep = this.selectedFile?.['type'] === 'video/mp4';

    if (this.selectedFile || this.selectedFile?.['type'] === 'video/mp4') {
      this.title.setValue(
        this.selectedFile.name.replace(/\.[̆^/.]+$/, '')
      );
      this.file = this.selectedFile;
      this.notMP4File = false;
      this.screenshots = await this._ffmpeg.getScreenshots(this.file);
    }

    if(!this.file || this.file.type !== 'video/mp4') {
      this.notMP4File = true;
      this.alertColor = 'red';
      this.alertMsg = 'Upload failed! Only MP4 files under 25MB are allowed.';
      return;
    }
  }

  // Function to recalc current storage usage by listing all files in the "clips" folder.
  async recalcStorageUsage(): Promise<number> {
    const clipsRef = ref(this._storage, 'clips');
    try {
      const listResult = await listAll(clipsRef);
      const items = listResult.items;
      let totalSize = 0;
      // Loop through each file and add up its size.
      for (const fileRef of items) {
        try {
          const metadata = await getMetadata(fileRef);
          totalSize += metadata.size;
        } catch (metaError) {
          console.error('Error getting metadata for', fileRef.fullPath, metaError);
        }
      }
      return totalSize;
    } catch (error) {
      console.error('Error listing files from Storage:', error);
      return 0;
    }
  }

  async uploadFile(): Promise<void> {
    this.uploadForm.disable();
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = 'Please wait! Your clip is being uploaded.';
    this.inSubmission = true;
    this.showPercentage = true;

    if (!this.file) {
      console.error('No file selected!');
      return;
    }

    const fileSize = this.file.size;

    // Recalculate current usage directly from Firebase Storage.
    const currentUsage = await this.recalcStorageUsage();

    // If the new file would push usage over the limit, abort upload.
    if (currentUsage + fileSize > MAX_USAGE) {
      this.alertColor = 'red';
      this.alertMsg = 'Storage is full. Please notify the administrator to clear the space.'
      this.showPercentage = false;
      return;
    }

    // Proceed with file upload.
    const clipFileName = uuid();
    const clipPath = `clips/${clipFileName}.mp4`;
    const storageRef = ref(this._storage, clipPath);

    this.uploadTask = uploadBytesResumable(storageRef, this.file);

    this.uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.percentage = progress as number / 100;
      },
      (error) => {
        this.alertColor = 'red';
        this.alertMsg = 'Upload failed, please try again! Only MP4 files under 25MB are allowed.'
        this.inSubmission = true;
        this.showPercentage = false;
      },
       () => {
        // On successful upload, get the download URL and create the clip object.
         getDownloadURL(storageRef)
          .then((downloadURL) => {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            const clip = {
              uid: currentUser?.uid as string ,
              displayName: currentUser?.displayName as string ,
              title: this.title.value,
              fileName: `${clipFileName}.mp4`,
              url: downloadURL,
              timestamp: serverTimestamp(),
            };

            this.alertColor = 'green';
            this.alertMsg = 'Success! Your clip is now ready to share with the world.';
            this.showPercentage = false;

            return this._clips.createClip(clip);

          }).then((clipDocRef) => {
           setTimeout(() => {
             this._router.navigate([
               'clip', clipDocRef.id
             ])
           }, 1000);
         })
          .catch((error) => {
            this.uploadForm.enable();
            console.error('Error getting download URL:', error);
            this.alertColor = 'red';
            this.alertMsg = 'Upload completed, but failed to retrieve file URL.';
            this.showPercentage = false;
          });
      }
    );
  }

}
