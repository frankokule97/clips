import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink, Params} from '@angular/router';

@Component({
  selector: 'app-clip',
  imports: [
    RouterLink
  ],
  templateUrl: './clip.component.html',
  styleUrl: './clip.component.css'
})
export class ClipComponent implements OnInit {

  public id = ''

  constructor(
    public _route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
  }

}
