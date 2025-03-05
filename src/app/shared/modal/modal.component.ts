import {Component, Input, OnInit, ElementRef, Inject, PLATFORM_ID} from '@angular/core';
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
export class ModalComponent implements OnInit {
  @Input() modalID = ''

  constructor(public modal: ModalService, public el: ElementRef, @Inject(PLATFORM_ID) private platformId: object) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.appendChild(this.el.nativeElement);
    }
  }

  closeModal() {
    this.modal.toggleModal(this.modalID);
  }

}
