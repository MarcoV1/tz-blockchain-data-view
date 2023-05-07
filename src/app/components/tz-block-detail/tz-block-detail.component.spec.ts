import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TzBlockDetailComponent } from './tz-block-detail.component';

describe('TzBlockDetailComponent', () => {
  let component: TzBlockDetailComponent;
  let fixture: ComponentFixture<TzBlockDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TzBlockDetailComponent]
    });
    fixture = TestBed.createComponent(TzBlockDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
