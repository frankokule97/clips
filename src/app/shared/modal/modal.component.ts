import {Component, Input, OnInit, ElementRef, Inject, PLATFORM_ID, OnDestroy} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {NgClass, isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [
    NgClass
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() modalID = ''

  constructor(public _modal: ModalService, public _el: ElementRef, @Inject(PLATFORM_ID) private _platformId: object) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this._platformId)) {
      document.body.appendChild(this._el.nativeElement);
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this._platformId)) {
      document.body.removeChild(this._el.nativeElement);
    }
  }

  closeModal() {
    this._modal.toggleModal(this.modalID);
    this._modal.registerForm.reset();
    this._modal.triggerLoginResetForm();
  }

}
