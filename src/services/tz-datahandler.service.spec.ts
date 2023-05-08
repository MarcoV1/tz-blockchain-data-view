import { TestBed } from '@angular/core/testing';

import { TzDataHandlerService } from './tz-datahandler.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {StoreModule} from "@ngrx/store";
import {blocksReducer} from "../rx-shared/tz.reducer";

describe('TzDatahandlerService', () => {
  let service: TzDataHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        StoreModule.forRoot({
          blocks: blocksReducer,
        }),]
    });
    service = TestBed.inject(TzDataHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
