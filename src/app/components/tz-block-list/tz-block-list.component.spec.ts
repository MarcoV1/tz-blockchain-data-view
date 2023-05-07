import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TzBlockListComponent } from './tz-block-list.component';

describe('TzBlockListComponent', () => {
  let component: TzBlockListComponent;
  let fixture: ComponentFixture<TzBlockListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TzBlockListComponent]
    });
    fixture = TestBed.createComponent(TzBlockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
