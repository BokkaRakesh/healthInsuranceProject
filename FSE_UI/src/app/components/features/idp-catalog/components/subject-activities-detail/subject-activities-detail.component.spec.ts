import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectActivitiesDetailComponent } from './subject-activities-detail.component';

describe('SubjectActivitiesDetailComponent', () => {
  let component: SubjectActivitiesDetailComponent;
  let fixture: ComponentFixture<SubjectActivitiesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubjectActivitiesDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubjectActivitiesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
