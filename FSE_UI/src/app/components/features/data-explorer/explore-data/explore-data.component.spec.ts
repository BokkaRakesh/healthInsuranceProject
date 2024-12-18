import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreDataComponent } from './explore-data.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ExploreDataComponent', () => {
  let component: ExploreDataComponent;
  let fixture: ComponentFixture<ExploreDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExploreDataComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExploreDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
