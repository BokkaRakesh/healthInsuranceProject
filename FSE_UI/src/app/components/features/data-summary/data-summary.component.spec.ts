import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSummaryComponent } from './data-summary.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DataSummaryComponent', () => {
  let component: DataSummaryComponent;
  let fixture: ComponentFixture<DataSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataSummaryComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
