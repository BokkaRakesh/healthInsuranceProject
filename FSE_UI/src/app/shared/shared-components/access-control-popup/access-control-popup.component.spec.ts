import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessControlPopupComponent } from './access-control-popup.component';

describe('AccessControlPopupComponent', () => {
  let component: AccessControlPopupComponent;
  let fixture: ComponentFixture<AccessControlPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessControlPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessControlPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
