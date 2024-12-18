import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArdClinicalDataComponent } from './ard-clinical-data.component';

describe('ArdClinicalDataComponent', () => {
  let component: ArdClinicalDataComponent;
  let fixture: ComponentFixture<ArdClinicalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArdClinicalDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArdClinicalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
