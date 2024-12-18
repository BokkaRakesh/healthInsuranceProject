import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreDataSearchContainerComponent } from './explore-data-search-container.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ExploreDataSearchContainerComponent', () => {
  let component: ExploreDataSearchContainerComponent;
  let fixture: ComponentFixture<ExploreDataSearchContainerComponent>;
  let selectedElement: Element;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExploreDataSearchContainerComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExploreDataSearchContainerComponent);
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

  it('should display the data catalog button', () => {   
    const kendoButton = fixture.nativeElement.querySelector('.workspace-btn');
    expect(kendoButton).toBeDefined();
    const dataButton = fixture.nativeElement.querySelector('.button-text');
    expect(dataButton.textContent).toBe('Data Catalog');           
  });

  it('should display the explore data recent searches', () => {   
    const recentSearch = fixture.nativeElement.querySelector('.recent-search');
    expect(recentSearch.textContent).toBe('Recent searches:');       
  });

});
