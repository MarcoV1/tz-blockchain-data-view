import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs";

@Component({
  selector: 'app-tz-block-detail',
  templateUrl: './tz-block-detail.component.html',
  styleUrls: ['./tz-block-detail.component.scss']
})
export class TzBlockDetailComponent {

  menuItemId$ = this.activatedRoute.params.pipe(map((params) => params["id"]));

  constructor(    private activatedRoute: ActivatedRoute,) {
  }

}
