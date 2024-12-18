import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdpArdsComponent } from './idp-ards.component';

describe('IdpArdsComponent', () => {
  let component: IdpArdsComponent;
  let fixture: ComponentFixture<IdpArdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdpArdsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdpArdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
