import {Component, OnInit} from '@angular/core';
import {RouterLink, Router, ActivatedRoute, Params} from '@angular/router';
import {ClipService} from '../../services/clip.service';
import IClip from '../../models/clip.model';
import {NgForOf} from '@angular/common';
import {EditComponent} from '../edit/edit.component';
import {ModalService} from '../../services/modal.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-manage',
  imports: [
    RouterLink,
    NgForOf,
    EditComponent
  ],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent implements OnInit {

  public videoOrder = '1';
  public clips: IClip[] = [];
  public activeClip: IClip | null = null;
  public sort$: BehaviorSubject<string>;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _clip: ClipService,
    private _modal: ModalService,
  ) {
    this.sort$ = new BehaviorSubject(this.videoOrder);
  }

  ngOnInit(): void {
    this._route.queryParams.subscribe((params: Params) => {
      this.videoOrder = params['sort'] === '2' ? params['sort'] : 1;
      this.sort$.next(this.videoOrder);
    });

    this._clip.getUserClips(this.sort$).subscribe(docs => {
      this.clips = [];

      docs.forEach(doc => {
        this.clips.push({
          ...doc
        })
      })
    });
  }

  sort(event: Event) {
    const { value } = (event.target as HTMLSelectElement);

    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        sort: value
      }
    })
  }

  openModal($event: Event, clip: IClip) {
    $event.preventDefault();

    this.activeClip = clip;
    this._modal.toggleModal('editClip');
  }

  update($event: IClip) {
    this.clips.forEach((element, index) => {
      if(element.docId == $event.docId) {
        this.clips[index].title = $event.title;
      }
    })
  }

  deleteClip($event: Event, clip: IClip) {
    $event.preventDefault();

    this._clip.deleteClip(clip);

    this.clips.forEach((element, index) => {
      if(element.docId == clip.docId) {
        this.clips.splice(index, 1);
      }
    })
  }

}
