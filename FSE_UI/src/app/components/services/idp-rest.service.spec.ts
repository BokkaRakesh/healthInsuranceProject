import { TestBed } from '@angular/core/testing';

import { IdpRestService } from './idp-rest.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('IdpRestService', () => {
  let service: IdpRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(IdpRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
