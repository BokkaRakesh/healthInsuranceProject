import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectDocumentationDetailsComponent } from './subject-documentation-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('StudyDocumentationDetailsComponent', () => {
  let component: SubjectDocumentationDetailsComponent;
  let fixture: ComponentFixture<SubjectDocumentationDetailsComponent>;
  const activatedRouteMock = {
    paramMap: of({ get: () => 'GO29431' }),
    snapshot: { paramMap: { get: () => 'GO29431' } }
  };
  // Mock for SubjectDocumentationPageMapping
  const mockSubjectDocumentationPageMapping =  [
    { uiLabel: 'Study Number', dbColumn: 'StudyNumber', highlight: true },
    { uiLabel: 'Clinical Phase', dbColumn: 'StudyPhase', highlight: true },
    { uiLabel: 'Label', dbColumn: '', highlight: false },
    { uiLabel: 'Hierarchy', dbColumn: '', highlight: false },
    { uiLabel: 'Subject Type', dbColumn: '', highlight: false },
    { uiLabel: 'First Name', dbColumn: '', highlight: false },
    { uiLabel: 'Last Name', dbColumn: 'IdpCreatedBy', highlight: false },
    { uiLabel: 'Date of Birth', dbColumn: 'studysource', highlight: false },
    { uiLabel: 'State', dbColumn: 'StudyType', highlight: false },  
    { uiLabel: 'Sex', dbColumn: '', highlight: false },
    { uiLabel: 'ML Set', dbColumn: '', highlight: false },
    { uiLabel: 'Race', dbColumn: '', highlight: false },
    { uiLabel: 'Ethnicity', dbColumn: '', highlight: false },
    { uiLabel: 'Species', dbColumn: '', highlight: false },
    { uiLabel: 'Strain', dbColumn: '', highlight: false },
];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SubjectDocumentationDetailsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubjectDocumentationDetailsComponent);
    component = fixture.componentInstance;
    const mockStudiesList = [
      { 
        IdpCreatedBy: "1",
        StudyIndication: "Alzheimer disease, Diabetic retinopathy",
        StudyNumber: "GO29431",
        StudyPhase: "Phase I",
        StudyType: "Interventional",
        modality: "MRI",
        studyscientificarea: "Acquisition",
        studysource: "CT" }
    ];
    component.studiesList = mockStudiesList;
    (globalThis as any).SubjectDocumentationPageMapping = mockSubjectDocumentationPageMapping;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should  call mapSubjectsResult when the subjectList is present', () => {
    // GIVEN
    const mapSubjectsResultSpy = spyOn(component, 'mapSubjectsResult').and.callThrough();

    // WHEN
    component.ngOnInit();
    fixture.detectChanges();

    // THEN
    expect(mapSubjectsResultSpy).toHaveBeenCalled();
    expect(component.mappedStudiesData).toBeDefined();
  });

  it('should map studies and set highLightedLabels and normalLabels correctly in mappedStudiesData', () => {
    // GIVEN
    const changes: SimpleChanges = {
      studiesList: new SimpleChange(null, [{ 
        IdpCreatedBy: "1",
        StudyIndication: "Alzheimer disease, Diabetic retinopathy",
        StudyNumber: "GO29431",
        StudyPhase: "Phase I",
        StudyType: "Interventional",
        modality: "MRI",
        studyscientificarea: "Acquisition",
        studysource: "CT" }], true),
    };

     // WHEN
    component.ngOnChanges(changes);
    fixture.detectChanges();

    // THEN
    expect(component.mappedStudiesData.size).toBe(1); // One subject in studiesList
    expect(component.mappedStudiesData).toBeDefined(); 
    const subject1Data = component.mappedStudiesData.get('GO29431');
    expect(subject1Data).toBeDefined();

    // Check highLightedLabels for subject 1
    expect(subject1Data?.highLightedLabels).toEqual([
      { uiLabel: 'Study Number', value: 'GO29431' },
      { uiLabel: 'Clinical Phase', value: 'Phase I' },  
      { uiLabel: 'Indication', value: 'Alzheimer disease, Diabetic retinopathy'},    
      { uiLabel: 'Scientific Area', value: 'Acquisition'},
      { uiLabel: 'Data Classification', value: '-' }
    ]);

    // Check normalLabels for subject 1
    expect(subject1Data?.normalLabels).toEqual([
      { uiLabel: 'Label', value: '-' },
      { uiLabel: 'Hierarchy', value: '-' },
      { uiLabel: 'Subject Type', value: '-' },
      { uiLabel: 'First Name', value: '-' },
      { uiLabel: 'Last Name', value: '1' },
      { uiLabel: 'Date of Birth', value: 'CT' },
      { uiLabel: 'State', value: 'Interventional' },
      { uiLabel: 'Sex', value: '-' },
      { uiLabel: 'ML Set', value: '-' },
      { uiLabel: 'Race', value: '-' },
      { uiLabel: 'Ethnicity', value: '-' },
      { uiLabel: 'Species', value: '-' },
      { uiLabel: 'Strain', value: '-' }
    ]);

  });
});
