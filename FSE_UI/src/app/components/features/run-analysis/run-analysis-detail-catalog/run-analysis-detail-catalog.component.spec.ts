import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunAnalysisDetailCatalogComponent } from './run-analysis-detail-catalog.component';

describe('RunAnalysisDetailCatalogComponent', () => {
  let component: RunAnalysisDetailCatalogComponent;
  let fixture: ComponentFixture<RunAnalysisDetailCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunAnalysisDetailCatalogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RunAnalysisDetailCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
