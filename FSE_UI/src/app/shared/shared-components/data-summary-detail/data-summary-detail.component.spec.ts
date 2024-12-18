import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSummaryDetailComponent } from './data-summary-detail.component';

describe('DataSummaryDetailComponent', () => {
  let component: DataSummaryDetailComponent;
  let fixture: ComponentFixture<DataSummaryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataSummaryDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataSummaryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
