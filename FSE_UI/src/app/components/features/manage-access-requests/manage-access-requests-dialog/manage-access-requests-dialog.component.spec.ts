import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAccessRequestsDialogComponent } from './manage-access-requests-dialog.component';

describe('ManageAccessRequestsDialogComponent', () => {
  let component: ManageAccessRequestsDialogComponent;
  let fixture: ComponentFixture<ManageAccessRequestsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageAccessRequestsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageAccessRequestsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
