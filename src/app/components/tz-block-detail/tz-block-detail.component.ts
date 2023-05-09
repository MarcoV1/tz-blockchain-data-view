import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map, Observable, switchMap, takeWhile} from "rxjs";
import {TzDataHandlerService} from "../../../services/tz-datahandler.service";
import {TzTransaction} from "../../../types/tz-transaction.interface";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-tz-block-detail',
  templateUrl: './tz-block-detail.component.html',
  styleUrls: ['../styles/common.scss']
})
export class TzBlockDetailComponent implements OnInit, OnDestroy {
  inView = true
  displayedColumns: string[] = ['sender', 'target', 'amount', 'status'];
  dataSource: MatTableDataSource<TzTransaction>;

  blockLevel$ = this.activatedRoute.params.pipe(map((params) => params["level"]));

  blockTransaction$: Observable<TzTransaction[]> = this.blockLevel$.pipe(
    switchMap(blockLevel => this.tzDataHandlerService.getTransactionsByBlockLevel(blockLevel))
  )

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private activatedRoute: ActivatedRoute,
              public tzDataHandlerService: TzDataHandlerService) {
  }

  ngOnInit() {
    this.loadTransactionsToTable();
  }

  ngOnDestroy() {
    this.inView = false;
  }

  private loadTransactionsToTable() {
    // usually I would do an async in the html, but for sorting/pagination purposes, this seemed the faster way
    this.blockTransaction$
      .pipe(takeWhile(() => this.inView))
      .subscribe((transactions: TzTransaction[]) => {
        this.dataSource = new MatTableDataSource(transactions);
        this.dataSource.paginator = this.paginator;
      });
  }

}
