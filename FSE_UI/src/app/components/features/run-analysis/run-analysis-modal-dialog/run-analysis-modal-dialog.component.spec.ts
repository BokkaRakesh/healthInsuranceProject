import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunAnalysisModalDialogComponent } from './run-analysis-modal-dialog.component';

describe('RunAnalysisModalDialogComponent', () => {
  let component: RunAnalysisModalDialogComponent;
  let fixture: ComponentFixture<RunAnalysisModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunAnalysisModalDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RunAnalysisModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
