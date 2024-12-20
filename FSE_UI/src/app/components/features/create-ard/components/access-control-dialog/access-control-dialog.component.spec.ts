import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessControlDialogComponent } from './access-control-dialog.component';

describe('AccessControlDialogComponent', () => {
  let component: AccessControlDialogComponent;
  let fixture: ComponentFixture<AccessControlDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessControlDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessControlDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
