import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateArdDialogComponent } from './create-ard-dialog.component';

describe('CreateArdDialogComponent', () => {
  let component: CreateArdDialogComponent;
  let fixture: ComponentFixture<CreateArdDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateArdDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateArdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
