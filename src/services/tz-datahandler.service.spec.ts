import { TestBed } from '@angular/core/testing';
import { TzDataHandlerService } from './tz-datahandler.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {StoreModule} from "@ngrx/store";
import {blocksReducer} from "../rx-shared/tz.reducer";
import {TzBlock} from "../types/tz-block.interface";

describe('TzDatahandlerService', () => {
  let service: TzDataHandlerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        StoreModule.forRoot({
          blocks: blocksReducer,
        }),]
    });
    service = TestBed.inject(TzDataHandlerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve list of blocks from the API', () => {
    const mockResponse = [{ level: 1, proposer: { address: 'test1' }, hash : '123', timestamp: '0' },
      { level: 2, proposer: { address: 'test1' }, hash : '1234', timestamp: '0' }] as TzBlock[];
    const url = 'https://api.tzkt.io/v1/blocks?sort.desc=level';
    service.getTzListOfBlocks().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
