import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TzDataHandlerService} from "../../../services/tz-datahandler.service";
import {Store} from "@ngrx/store";
import {getListOfBlocks} from "../../../rx-shared/tz.actions";
import {TzBlock} from "../../../types/tz-block.interface";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {combineLatest, takeWhile} from "rxjs";

@Component({
  selector: 'app-tz-block-list',
  templateUrl: './tz-block-list.component.html',
  styleUrls: ['../styles/common.scss']
})
export class TzBlockListComponent implements OnInit, OnDestroy {
  inView = true
  displayedColumns: string[] = ['level', 'proposer', 'timestamp', 'numberTransactions'];
  dataSource: MatTableDataSource<TzBlock>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public tzDataHandlerService: TzDataHandlerService,
              private store: Store,
              private router: Router) {


    tzDataHandlerService.blockList$.pipe()
      .subscribe(res => console.log("res", res))
  }

  ngOnInit() {
    this.store.dispatch(getListOfBlocks());
    this.loadBlocksDataToTable();
  }

  ngOnDestroy() {
    this.inView = false;
  }

  loadBlocksDataToTable() {
    // usually I would do an async in the html, but for pagination purposes, this seemed the faster way
    combineLatest([this.tzDataHandlerService.blockList$, this.tzDataHandlerService.transactionsCount$])
      .pipe(takeWhile(() => this.inView))
      .subscribe(([blockList, transactionCount]) => {
        const pageIndexAndSize = this.tzDataHandlerService.currentPageIndexAndSize$.value;
        const updatedBlockList = blockList.map((block, index) => {

          if (index >= pageIndexAndSize[0] * pageIndexAndSize[1]
            && index < (pageIndexAndSize[0] * pageIndexAndSize[1] + pageIndexAndSize[1])) {
            return {
              ...block,
              transactionCount: transactionCount.splice(0,1)
            }
          } else return block;

        }) as TzBlock[];

        this.dataSource = new MatTableDataSource(updatedBlockList);
        this.dataSource.paginator = this.paginator;
    });
  }

  onRowClick(row: TzBlock) {
    this.router.navigate(['/details', row.level]);
  }

  handlePageEvent(event: PageEvent) {
    this.tzDataHandlerService.currentPageIndexAndSize$.next([event.pageIndex, event.pageSize]);
  }
}
