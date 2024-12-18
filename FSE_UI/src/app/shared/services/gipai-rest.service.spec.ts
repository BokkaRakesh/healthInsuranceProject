import { TestBed } from '@angular/core/testing';

import { GipaiRestService } from './gipai-rest.service';

describe('GipaiRestService', () => {
  let service: GipaiRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GipaiRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
