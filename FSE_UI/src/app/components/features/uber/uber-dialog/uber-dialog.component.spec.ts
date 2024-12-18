import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UberDialogComponent } from './uber-dialog.component';

describe('UberDialogComponent', () => {
  let component: UberDialogComponent;
  let fixture: ComponentFixture<UberDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UberDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
