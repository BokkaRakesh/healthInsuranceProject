import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIdpSearchContainerComponent } from './create-idp-search-container.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CreateIdpSearchContainerComponent', () => {
  let component: CreateIdpSearchContainerComponent;
  let fixture: ComponentFixture<CreateIdpSearchContainerComponent>;
  let selectedElement: Element;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateIdpSearchContainerComponent],
      schemas: [NO_ERRORS_SCHEMA],

    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateIdpSearchContainerComponent);
    component = fixture.componentInstance;
    selectedElement=fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the stepper info', () => {
    const stepper = fixture.nativeElement.querySelector('.stepper');
    expect(stepper).toBeDefined();
    expect(selectedElement.querySelector('app-stepper')).toBeTruthy();
  });

  it('should display the searchBar', () => {
    const searchBar = fixture.nativeElement.querySelector('.searchBar');
    expect(searchBar).toBeDefined();
    expect(selectedElement.querySelector('app-search-box')).toBeTruthy();
  });

  it('should display the recent created idps', () => {   
    const recentcreatedIdps = fixture.nativeElement.querySelector('.recent-created-idps');
    expect(recentcreatedIdps.textContent).toBe('My recently created IDPs:');       
  });

});
