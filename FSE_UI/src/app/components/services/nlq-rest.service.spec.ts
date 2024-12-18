import { TestBed } from '@angular/core/testing';

import { NlqRestService } from './nlq-rest.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NlqRestService', () => {
  let service: NlqRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(NlqRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
