import {Component, OnInit, OnDestroy, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {ModalComponent} from '../../shared/modal/modal.component';
import {ModalService} from '../../services/modal.service';
import IClip from '../../models/clip.model';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputComponent} from '../../shared/input/input.component';
import {AlertComponent} from '../../shared/alert/alert.component';
import {NgClass, NgIf} from '@angular/common';
import {ClipService} from '../../services/clip.service';

@Component({
  selector: 'app-edit',
  imports: [
    ModalComponent,
    ReactiveFormsModule,
    InputComponent,
    AlertComponent,
    NgIf,
    NgClass
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {

@Input() activeClip: IClip | null = null;

@Output() update = new EventEmitter();

  public inSubmission = false;
  public showAlert = false;
  public alertColor = 'blue';
  public alertMsg = 'Please wait! Updating clip.'

  public clipId = new FormControl('', {
    nonNullable: true,
  });

  public title = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(3)
    ],
    nonNullable: true,
  });

  public editForm = new FormGroup({
    title: this.title,
    id: this.clipId,
  });

  constructor(
    private _modal: ModalService,
    private _clip: ClipService,
  ) {}

  ngOnInit() {
    this._modal.register('editClip')
  }

  ngOnDestroy() {
    this._modal.unregister('editClip');
  }

  ngOnChanges() {
    if(!this.activeClip) {
      return;
    }

    this.inSubmission = false;
    this.showAlert = false;
    if(this.activeClip.docId) {
      this.clipId.setValue(this.activeClip.docId);
    }
    this.title.setValue(this.activeClip.title);
  }

  async submit() {
    if(!this.activeClip) {
      return;
    }

    this.inSubmission = true;
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = 'Please wait! Updating clip.';

    try {
      await this._clip.updateClip(
        this.clipId.value, this.title.value
      )
    } catch (e) {
      this.inSubmission = false;
      this.alertColor = 'red';
      this.alertMsg = 'Something went wrong. Try again later.';
      return;
    }

    this.activeClip.title = this.title.value;
    this.update.emit(this.activeClip);

    this.inSubmission = false;
    this.alertColor = 'green';
    this.alertMsg = 'Success!';

    setTimeout(() => {
      this._modal.toggleModal('editClip');
    }, 1000);
  }

}
