import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TzBlockListComponent } from './tz-block-list.component';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {StoreModule} from "@ngrx/store";
import {blocksReducer} from "../../../rx-shared/tz.reducer";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {TzBlock} from "../../../types/tz-block.interface";
import {By} from "@angular/platform-browser";
import {Router} from "@angular/router";

describe('TzBlockListComponent', () => {
  let component: TzBlockListComponent;
  let fixture: ComponentFixture<TzBlockListComponent>;
  let router: Router;

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
    router = TestBed.inject(Router);

    const testData = [
      { level: 1, proposer: { address: 'test1' }, hash : '1233', timestamp: '0', transactionCount: 4 },
      { level: 2, proposer: { address: 'test2' }, hash : '1234', timestamp: '0', transactionCount: 2 },
      { level: 3, proposer: { address: 'test3' }, hash : '1235', timestamp: '0', transactionCount: 1 },
      { level: 4, proposer: { address: 'test4' }, hash : '1236', timestamp: '0', transactionCount: 3 },
    ] as TzBlock[];

    component.dataSource = new MatTableDataSource(testData);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to details page when a row is clicked', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    const rowHtmlElements = fixture.debugElement.nativeElement.querySelectorAll('tbody tr');
    expect(rowHtmlElements.length).toBe(4);
    rowHtmlElements[1].click()
    expect(routerSpy).toHaveBeenCalledWith(['/details', component.dataSource.data[1].level]);
  });

  it('should display table with correct data', () => {
    const firstRowLevel = fixture.debugElement.query(By.css('tr:first-child td:first-child'));
    const firstRowTransactionCount = fixture.debugElement.query(By.css('tr:first-child td:last-child'));
    const lastRowLevel = fixture.debugElement.query(By.css('tr:last-child td:first-child'));
    const lastRowTransactionCount = fixture.debugElement.query(By.css('tr:last-child td:last-child'));

    expect(firstRowLevel.nativeElement.textContent.trim()).toBe(
      component.dataSource.data[0].level.toString()
    );
    expect(firstRowTransactionCount.nativeElement.textContent.trim()).toBe(
      component.dataSource.data[0].transactionCount?.toString()
    );

    expect(lastRowLevel.nativeElement.textContent.trim()).toBe(
      component.dataSource.data[3].level.toString()
    );
    expect(lastRowTransactionCount.nativeElement.textContent.trim()).toBe(
      component.dataSource.data[3].transactionCount?.toString()
    );
  });

});
