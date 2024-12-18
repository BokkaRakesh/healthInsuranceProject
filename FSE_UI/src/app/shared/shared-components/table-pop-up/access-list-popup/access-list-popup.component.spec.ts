import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessListPopupComponent } from './access-list-popup.component';

describe('AccessListPopupComponent', () => {
  let component: AccessListPopupComponent;
  let fixture: ComponentFixture<AccessListPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessListPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessListPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
