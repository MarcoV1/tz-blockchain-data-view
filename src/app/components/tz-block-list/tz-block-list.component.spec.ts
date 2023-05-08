import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TzBlockListComponent } from './tz-block-list.component';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {StoreModule} from "@ngrx/store";
import {blocksReducer} from "../../../rx-shared/tz.reducer";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {By} from "@angular/platform-browser";
import {TzTransaction} from "../../../types/tz-transaction.interface";
import {TzBlock} from "../../../types/tz-block.interface";

describe('TzBlockListComponent', () => {
  let component: TzBlockListComponent;
  let fixture: ComponentFixture<TzBlockListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TzBlockListComponent],
      imports: [
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        RouterTestingModule,
        HttpClientTestingModule,
        HttpClientModule,
        StoreModule.forRoot({
          blocks: blocksReducer,
        }),
      ]
    });
    fixture = TestBed.createComponent(TzBlockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to details page when row is clicked', () => {
    const testData = [
      { level: 1, proposer: { address: 'test1' }, hash : '123', timestamp: '0' },
      { level: 2, proposer: { address: 'test1' }, hash : '123', timestamp: '0' },
      { level: 3, proposer: { address: 'test1' }, hash : '123', timestamp: '0' },
      { level: 4, proposer: { address: 'test1' }, hash : '123', timestamp: '0' },
    ] as TzBlock[];

    component.dataSource = new MatTableDataSource(testData);
    fixture.detectChanges();

    const routerSpy = spyOn(component['router'], 'navigate');

 //   const tableRows = fixture.debugElement.queryAll(By.css('mat-row'));
    let tableRows = fixture.nativeElement.querySelectorAll('tr');
    console.log('tableRo', tableRows)
    tableRows[1].triggerEventHandler('click', null);

    expect(routerSpy).toHaveBeenCalledWith(['/details', testData[1].level]);
  });

});
