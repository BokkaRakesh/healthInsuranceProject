import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbNavigationComponent } from './breadcrumb-navigation.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { ActivatedRoute } from '@angular/router';

describe('BreadcrumbNavigationComponent', () => {
  let component: BreadcrumbNavigationComponent;
  let fixture: ComponentFixture<BreadcrumbNavigationComponent>;
  const mockActivatedRoute = {
    snapshot: {
      params: {}
    }
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreadcrumbNavigationComponent],
      providers: [
        BreadcrumbService,
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BreadcrumbNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call getbreadCrumbValue', () => {
    component.getbreadCrumbValue()
    expect(component.breadcrumbsList).toBeDefined();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
