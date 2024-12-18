import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCatalogComponent } from './study-catalog.component';
import { BreadcrumbNavigationComponent } from '../../../../../shared/shared-components/breadcrumb-navigation/breadcrumb-navigation.component';
import { BreadcrumbService } from '../../../../../shared/services/breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { FilterBadgeComponent } from '../../../../../shared/shared-components/filter-badge/filter-badge.component';
import { SearchBoxComponent } from '../../../../../shared/shared-components/search-box/search-box.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('StudyCatalogComponent', () => {
  let component: StudyCatalogComponent;
  let fixture: ComponentFixture<StudyCatalogComponent>;
  const mockActivatedRoute = {
    snapshot: {
      params: {}
    }
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyCatalogComponent, BreadcrumbNavigationComponent, FilterBadgeComponent, SearchBoxComponent],
      providers: [
        BreadcrumbService,
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudyCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
