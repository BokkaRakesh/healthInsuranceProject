import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunAnalysisGridComponent } from './run-analysis-grid.component';

describe('RunAnalysisGridComponent', () => {
  let component: RunAnalysisGridComponent;
  let fixture: ComponentFixture<RunAnalysisGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunAnalysisGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RunAnalysisGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
