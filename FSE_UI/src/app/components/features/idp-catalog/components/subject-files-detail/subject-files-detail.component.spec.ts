import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectFilesDetailComponent } from './subject-files-detail.component';

describe('SubjectFilesDetailComponent', () => {
  let component: SubjectFilesDetailComponent;
  let fixture: ComponentFixture<SubjectFilesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectFilesDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubjectFilesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
