import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdpCatalogSearchContainerComponent } from './idp-catalog-search-container.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('IdpCatalogSearchContainerComponent', () => {
  let component: IdpCatalogSearchContainerComponent;
  let fixture: ComponentFixture<IdpCatalogSearchContainerComponent>;
  let selectedElement: Element;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IdpCatalogSearchContainerComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdpCatalogSearchContainerComponent);
    component = fixture.componentInstance;
    selectedElement=fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    if (fixture.nativeElement && 'remove' in fixture.nativeElement) {
      (fixture.nativeElement as HTMLElement).remove();
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the summary info', () => {
    const summary = fixture.nativeElement.querySelector('.summary');
    expect(summary).toBeDefined();
    expect(selectedElement.querySelector('app-summary')).toBeTruthy();
  });

  it('should display the searchBar', () => {
    const searchBar = fixture.nativeElement.querySelector('.searchBar');
    expect(searchBar).toBeDefined();
    expect(selectedElement.querySelector('app-search-box')).toBeTruthy();
  });

  it('should display the IDP catalog button', () => {   
    const kendoButton = fixture.nativeElement.querySelector('.workspace-btn');
    expect(kendoButton).toBeDefined();
    const dataButton = fixture.nativeElement.querySelector('.button-text');
    expect(dataButton.textContent).toBe('IDP Catalog');           
  });

  it('should display the explore data recent searches', () => {   
    const favouriteIdps = fixture.nativeElement.querySelector('.recent-idps');
    expect(favouriteIdps.textContent).toBe('My favorited IDPs:IPSOS-Oncology Monitor ID253654 MN3989_Musicale ');       
  });

});
