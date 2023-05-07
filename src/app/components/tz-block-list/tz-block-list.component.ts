import {Component, OnInit, ViewChild} from '@angular/core';
import {TzDataHandlerService} from "../../../services/tz-datahandler.service";
import {Store} from "@ngrx/store";
import {getListOfBlocks} from "../../../rx-shared/tz.actions";
import {TzBlock} from "../../../types/tz-block.interface";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-tz-block-list',
  templateUrl: './tz-block-list.component.html',
  styleUrls: ['./tz-block-list.component.scss']
})
export class TzBlockListComponent implements OnInit {

  displayedColumns: string[] = ['block'];
  dataSource: MatTableDataSource<TzBlock>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public tzDataHandlerService: TzDataHandlerService,
              private store: Store) {


    tzDataHandlerService.blockList$.pipe()
      .subscribe(res => console.log("res", res))
  }


  ngOnInit() {
    this.store.dispatch(getListOfBlocks());

    this.loadBlocksDataToTable();
  }


  loadBlocksDataToTable() {
    // usually I would do an async in the html, but for sorting/pagination purposes, this seemed the faster way
    this.tzDataHandlerService.blockList$.subscribe((blockList: TzBlock[]) => {
      this.dataSource = new MatTableDataSource(blockList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
