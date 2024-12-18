import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunAnalysisConfigurationComponent } from './run-analysis-configuration.component';

describe('RunAnalysisConfigurationComponent', () => {
  let component: RunAnalysisConfigurationComponent;
  let fixture: ComponentFixture<RunAnalysisConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunAnalysisConfigurationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RunAnalysisConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
