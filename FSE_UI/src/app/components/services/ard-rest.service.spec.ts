import { TestBed } from '@angular/core/testing';

import { ArdRestService } from './ard-rest.service';

describe('ArdRestService', () => {
  let service: ArdRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArdRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
