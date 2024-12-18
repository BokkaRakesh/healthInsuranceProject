import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdpFilterDialogComponent } from './idp-filter-dialog.component';

describe('IdpFilterDialogComponent', () => {
  let component: IdpFilterDialogComponent;
  let fixture: ComponentFixture<IdpFilterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdpFilterDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdpFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
