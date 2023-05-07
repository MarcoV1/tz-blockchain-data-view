import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TzBlock} from "../types/tz-block.interface";
import {Store} from "@ngrx/store";
import {selectBlockList, selectBlocks} from "../rx-shared/tz.selectors";
import {TzState} from "../rx-shared/tz.state";

@Injectable({
  providedIn: 'root'
})
export class TzDataHandlerService {

  blockList$ = this.store.select(selectBlockList);

  constructor(private httpClient: HttpClient,
              private store: Store<TzState>) { }

  getTzListOfBlocks(): Observable<TzBlock[]> {
    return this.httpClient.get(`https://api.tzkt.io/v1/blocks`) as Observable<TzBlock[]>;
  }
}
