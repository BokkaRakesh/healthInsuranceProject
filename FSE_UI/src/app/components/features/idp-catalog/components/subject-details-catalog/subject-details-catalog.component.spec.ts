import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectDetailsCatalogComponent } from './subject-details-catalog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('SubjectDetailsCatalogComponent', () => {
  let component: SubjectDetailsCatalogComponent;
  let fixture: ComponentFixture<SubjectDetailsCatalogComponent>;
  const activatedRouteMock = {
    paramMap: of({ get: () => 'GO29431' }), // Mocking paramMap, adjust as needed
    snapshot: { paramMap: { get: () => 'GO29431' } }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SubjectDetailsCatalogComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubjectDetailsCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
