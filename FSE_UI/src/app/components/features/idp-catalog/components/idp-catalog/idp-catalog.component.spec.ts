import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdpCatalogComponent } from './idp-catalog.component';

describe('IdpCatalogComponent', () => {
  let component: IdpCatalogComponent;
  let fixture: ComponentFixture<IdpCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdpCatalogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdpCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
