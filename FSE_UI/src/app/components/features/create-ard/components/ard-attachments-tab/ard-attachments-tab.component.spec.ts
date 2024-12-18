import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArdAttachmentsTabComponent } from './ard-attachments-tab.component';

describe('ArdAttachmentsTabComponent', () => {
  let component: ArdAttachmentsTabComponent;
  let fixture: ComponentFixture<ArdAttachmentsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArdAttachmentsTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArdAttachmentsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
