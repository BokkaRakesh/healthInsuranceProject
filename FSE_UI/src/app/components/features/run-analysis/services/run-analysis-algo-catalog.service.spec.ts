import { TestBed } from '@angular/core/testing';

import { RunAnalysisAlgoCatalogService } from './run-analysis-algo-catalog.service';

describe('RunAnalysisAlgoCatalogService', () => {
  let service: RunAnalysisAlgoCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RunAnalysisAlgoCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
