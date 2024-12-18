import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRunAnalysisComponent } from './view-run-analysis.component';

describe('ViewRunAnalysisComponent', () => {
  let component: ViewRunAnalysisComponent;
  let fixture: ComponentFixture<ViewRunAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRunAnalysisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewRunAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
