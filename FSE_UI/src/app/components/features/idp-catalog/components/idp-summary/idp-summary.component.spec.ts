import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdpSummaryComponent } from './idp-summary.component';

describe('IdpSummaryComponent', () => {
  let component: IdpSummaryComponent;
  let fixture: ComponentFixture<IdpSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IdpSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdpSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
