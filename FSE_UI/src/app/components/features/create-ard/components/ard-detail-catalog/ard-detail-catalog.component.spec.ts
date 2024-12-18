import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArdDetailCatalogComponent } from './ard-detail-catalog.component';

describe('ArdDetailCatalogComponent', () => {
  let component: ArdDetailCatalogComponent;
  let fixture: ComponentFixture<ArdDetailCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArdDetailCatalogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ArdDetailCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
