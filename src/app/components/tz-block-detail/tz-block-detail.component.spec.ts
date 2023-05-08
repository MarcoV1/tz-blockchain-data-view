import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TzBlockDetailComponent } from './tz-block-detail.component';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {RouterTestingModule} from "@angular/router/testing";
import {TzTransaction} from "../../../types/tz-transaction.interface";
import {By} from "@angular/platform-browser";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {StoreModule} from "@ngrx/store";
import {blocksReducer} from "../../../rx-shared/tz.reducer";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";

describe('TzBlockDetailComponent', () => {
  let component: TzBlockDetailComponent;
  let fixture: ComponentFixture<TzBlockDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TzBlockDetailComponent],
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
    fixture = TestBed.createComponent(TzBlockDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display details table data', () => {
    const testData = [
      { sender: { address: 'test1' }, target: { address: 'test1' }, amount : 0, status: 'applied' },
      { sender: { address: 'test2' }, target: { address: 'test2' }, amount : 1, status: 'applied' },
      { sender: { address: 'test2' }, target: { address: 'test2' }, amount : 2, status: 'applied' },
      { sender: { address: 'test2' }, target: { address: 'test2' }, amount : 3, status: 'applied' },
      { sender: { address: 'test2' }, target: { address: 'test2' }, amount : 4, status: 'applied' }
    ] as TzTransaction[];

//    component.dataSource = of(testData);
    component.dataSource = new MatTableDataSource(testData);
    fixture.detectChanges();

    let tableRows2 = fixture.nativeElement.querySelectorAll('tr');
    expect(tableRows2.length).toBe(testData.length);

    const tableRows = fixture.debugElement.queryAll(By.css('mat-mdc-row'));

    console.log('rows', tableRows, testData.length)
    expect(tableRows.length).toBe(testData.length);
  });
});
