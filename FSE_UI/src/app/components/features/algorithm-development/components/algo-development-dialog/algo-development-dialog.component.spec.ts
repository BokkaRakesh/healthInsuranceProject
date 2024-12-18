import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoDevelopmentDialogComponent } from './algo-development-dialog.component';

describe('AlgoDevelopmentDialogComponent', () => {
  let component: AlgoDevelopmentDialogComponent;
  let fixture: ComponentFixture<AlgoDevelopmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlgoDevelopmentDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlgoDevelopmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
