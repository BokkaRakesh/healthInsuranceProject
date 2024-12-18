import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdpDocumentationComponent } from './idp-documentation.component';

describe('IdpDocumentationComponent', () => {
  let component: IdpDocumentationComponent;
  let fixture: ComponentFixture<IdpDocumentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdpDocumentationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdpDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
