import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdpClinicalDataComponent } from './idp-clinical-data.component';

describe('IdpClinicalDataComponent', () => {
  let component: IdpClinicalDataComponent;
  let fixture: ComponentFixture<IdpClinicalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IdpClinicalDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdpClinicalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
