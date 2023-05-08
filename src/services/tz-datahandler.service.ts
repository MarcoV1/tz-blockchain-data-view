import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, filter, forkJoin, map, mergeMap, Observable} from "rxjs";
import {TzBlock} from "../types/tz-block.interface";
import {Store} from "@ngrx/store";
import {selectBlockList} from "../rx-shared/tz.selectors";
import {TzState} from "../rx-shared/tz.state";
import {TzTransaction} from "../types/tz-transaction.interface";
import {combineLatest} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TzDataHandlerService {
  blockList$ = this.store.select(selectBlockList);
  currentPageIndexAndSize$ = new BehaviorSubject([0, 5]);

  transactionsCount$ = combineLatest([this.blockList$, this.currentPageIndexAndSize$])
    .pipe(
    filter( ([blockList, pageIndexAndSize]) => blockList?.length > 0),
    map(([blockList, pageIndexAndSize]: ([TzBlock[], number[]])) => {
      return blockList.map(block => block.level).splice(pageIndexAndSize[0] * pageIndexAndSize[1], pageIndexAndSize[1])
    }),
    mergeMap((numbers: number[]) => {
     return forkJoin(numbers.map(number => this.getTzTransactionsCount(number)))
    })
  )

  constructor(private httpClient: HttpClient,
              private store: Store<TzState>) { }

  getTzListOfBlocks(): Observable<TzBlock[]> {
    return this.httpClient.get(`https://api.tzkt.io/v1/blocks?sort.desc=level`) as Observable<TzBlock[]>;
  }

  getTzTransactionsCount(level: number): Observable<any> {
    return this.httpClient.get(`https://api.tzkt.io/v1/operations/transactions/count?level.in=${level}`) as Observable<any>;
  }

  getTransactionsByBlockLevel(level: number): Observable<TzTransaction[]> {
    return this.httpClient.get(`https://api.tzkt.io/v1/operations/transactions?level.in=${level}`) as Observable<TzTransaction[]>;
  }
}
