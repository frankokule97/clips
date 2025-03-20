import { Injectable } from '@angular/core';
import {FormGroup, NgForm} from '@angular/forms';
import {Subject} from 'rxjs';

interface IModal {
  id: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _resetFormSubject = new Subject<void>();
  private modals: IModal[] = [];

  public registerForm!: FormGroup;
  public credentials= {
    email: '',
    password: ''
  };
  public resetForm$ = this._resetFormSubject.asObservable();

  constructor() { }

  isModalOpen(id: string) : boolean {
    return !!this.modals.find(el => el.id === id)?.visible;
  }

  toggleModal(id: string) {
    const modal = this.modals.find(el => el.id === id)

    if (modal) {
      modal.visible = !modal.visible;
    }
  }

  register(id: string) {
    this.modals.push({
      id,
      visible: false,
    })
  }

  unregister(id: string) {
    this.modals = this.modals.filter(
      el => el.id !== id
    );
  }

  triggerLoginResetForm(): void {
    this._resetFormSubject.next();
  }

}

