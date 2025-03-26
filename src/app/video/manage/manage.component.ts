import {Component, OnInit} from '@angular/core';
import {RouterLink, Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-manage',
  imports: [
    RouterLink
  ],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent implements OnInit {

  public videoOrder = '1'

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this._route.queryParams.subscribe((params: Params) => {
      this.videoOrder = params['sort'] === '2' ? params['sort'] : 1;
    })
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

}
