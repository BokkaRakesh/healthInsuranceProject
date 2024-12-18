import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArdInsightsComponent } from './ard-insights.component';

describe('ArdInsightsComponent', () => {
  let component: ArdInsightsComponent;
  let fixture: ComponentFixture<ArdInsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArdInsightsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArdInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
