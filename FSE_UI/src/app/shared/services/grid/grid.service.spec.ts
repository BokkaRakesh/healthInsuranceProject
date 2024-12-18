import { TestBed } from '@angular/core/testing';

import { GridService } from './grid.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('GridService', () => {
  let service: GridService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(GridService);
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
