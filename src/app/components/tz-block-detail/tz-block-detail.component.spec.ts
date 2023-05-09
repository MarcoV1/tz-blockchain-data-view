import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TzBlockDetailComponent } from './tz-block-detail.component';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {RouterTestingModule} from "@angular/router/testing";
import {TzTransaction} from "../../../types/tz-transaction.interface";
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

  it('should display table with correct number of rows', () => {
    const testData = [
      { sender: { address: 'test1' }, target: { address: 'test1' }, amount : 0, status: 'applied' },
      { sender: { address: 'test2' }, target: { address: 'test2' }, amount : 1, status: 'applied' },
      { sender: { address: 'test3' }, target: { address: 'test3' }, amount : 2, status: 'applied' },
      { sender: { address: 'test4' }, target: { address: 'test4' }, amount : 3, status: 'applied' },
      { sender: { address: 'test5' }, target: { address: 'test5' }, amount : 4, status: 'applied' }
    ] as TzTransaction[];

    component.dataSource = new MatTableDataSource(testData);
    fixture.detectChanges();

    let tableRows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(tableRows.length).toBe(component.dataSource.data.length);
  });
});
