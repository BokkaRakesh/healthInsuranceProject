import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SearchBoxComponent } from './search-box.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBoxComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should clear the input if clear button is clicked', fakeAsync(() => {
    // GIVEN
    component.searchForm.controls['searchQuery'].setValue('test');
    // WHEN
    component.clearSearch();
    // THEN
    expect(component.searchForm.get('searchQuery')?.value).toBe(null);

  }))

  it('should emit the entered text if search button is clicked', fakeAsync(() => {
    // GIVEN
    component.searchForm.controls['searchQuery'].setValue('data entered');
    spyOn(component.search, 'emit');
    // WHEN
    component.performSearch();
    // THEN
    expect(component.search.emit).toHaveBeenCalledOnceWith('data entered');

  }))
});
