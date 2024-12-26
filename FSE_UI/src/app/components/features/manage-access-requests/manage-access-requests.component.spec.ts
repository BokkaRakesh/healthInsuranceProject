import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAccessRequestsComponent } from './manage-access-requests.component';

describe('ManageAccessRequestsComponent', () => {
  let component: ManageAccessRequestsComponent;
  let fixture: ComponentFixture<ManageAccessRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageAccessRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageAccessRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
