import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunAnalysisDetailPopUpComponent } from './run-analysis-detail-pop-up.component';

describe('RunAnalysisDetailPopUpComponent', () => {
  let component: RunAnalysisDetailPopUpComponent;
  let fixture: ComponentFixture<RunAnalysisDetailPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunAnalysisDetailPopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RunAnalysisDetailPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
