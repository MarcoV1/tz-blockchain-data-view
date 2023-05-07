import { TestBed } from '@angular/core/testing';

import { TzDataHandlerService } from './tz-datahandler.service';

describe('TzDatahandlerService', () => {
  let service: TzDataHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TzDataHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
