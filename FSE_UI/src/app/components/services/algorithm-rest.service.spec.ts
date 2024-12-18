import { TestBed } from '@angular/core/testing';

import { AlgorithmRestService } from './algorithm-rest.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AlgorithmRestService', () => {
  let service: AlgorithmRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AlgorithmRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
