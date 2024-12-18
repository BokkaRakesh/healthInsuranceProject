import { TestBed } from '@angular/core/testing';

import { BreadcrumbService } from './breadcrumb.service';
import { ActivatedRoute } from '@angular/router';

describe('BreadcrumbService', () => {
  let service: BreadcrumbService;
  const mockActivatedRoute = {
    snapshot: {
      params: {}
    }
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BreadcrumbService,
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    });
    service = TestBed.inject(BreadcrumbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
