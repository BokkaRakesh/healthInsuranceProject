import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectDetailsComponent } from './subject-details.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IdpRestService } from '../../../../services/idp-rest.service';

describe('SubjectDetailsComponent', () => {
  let component: SubjectDetailsComponent;
  let fixture: ComponentFixture<SubjectDetailsComponent>;
  let mockIdpRestService: jasmine.SpyObj<IdpRestService>;
  const activatedRouteMock = {
    paramMap: of({ get: () => 'GO29431' }),
    snapshot: { paramMap: { get: () => 'GO29431' } }
  };
  mockIdpRestService = jasmine.createSpyObj('IdpRestService', ['getSubjectDocumentationInfo']);

  beforeEach(async () => {   
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SubjectDetailsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: IdpRestService, useValue: mockIdpRestService }
      ]
    })
    .compileComponents();
   
    fixture = TestBed.createComponent(SubjectDetailsComponent);
    component = fixture.componentInstance;
    const mockResponse = {
      data: {
        items: [{ studynumber: '1' }, { studynumber: '2' }]
      }
    };
    mockIdpRestService.getSubjectDocumentationInfo.and.returnValue(of(mockResponse));
    fixture.detectChanges();
  });

  it('should create', () => {
    const mockResponse = {
      data: {
        items: [{ studynumber: '1' }, { studynumber: '2' }]
      }
    };
    mockIdpRestService.getSubjectDocumentationInfo.and.returnValue(of(mockResponse));
    expect(component).toBeTruthy();
  });

  it('should call getSubjectDocumentationInfo and update subjectResult and studiesList', () => {
    // GIVEN
    const mockResponse = {
      data: {
        items: [{ studynumber: '1' }, { studynumber: '2' }]
      }
    };
    mockIdpRestService.getSubjectDocumentationInfo.and.returnValue(of(mockResponse));

    // WHEN
    component.getSubjectDocumentationData();

    // THEN
    expect(mockIdpRestService.getSubjectDocumentationInfo).toHaveBeenCalled();
    expect(component.subjectResult).toEqual(mockResponse);
    expect(component.studiesList).toEqual(mockResponse.data.items);
  });

  it('should set selectedTab and call getSummaryMetricDetails with the event value', () => {
     // GIVEN
    const mockEvent = { value: 'Documentation' };
    spyOn(component,'getSummaryMetricDetails');

    // WHEN
    component.getSelectedTabInfo(mockEvent);

    // THEN
    expect(component.selectedTab).toBe(mockEvent);  // Verify selectedTab is set correctly
    expect(component.getSummaryMetricDetails).toHaveBeenCalledWith('Documentation');  // Verify getSummaryMetricDetails is called with event value
  });

  it('should populate summary based on summaryData and metricsDetail', () => {
    // GIVEN
    component.subjectResult = {
      data: {
        "summary": {
          "studies": 2,
          "subjects": 0,
          "files": 10,
          "sessions": 5,
          "acquisitions": 30,
          "analyses": 0
        }
      }
    };
    // WHEN
    spyOn(component,'showMetricBasedOnSelectedTab').and.callThrough();
    component.getSummaryInfo('Documentation');
    // THEN
    expect(component.showMetricBasedOnSelectedTab).toHaveBeenCalledWith('Documentation');
    expect(component.summary).toEqual([
      {icon: 'file-attach', name: 'Files', value: 10},
      {icon: 'file-session', name: 'Sessions', value: 5},    
      {icon: 'file-data-pull', name: 'Acquisitions', value: 30}
    ]);
  });

  it('should set empty icon and name for items without metricsDetail keys', () => {
    // GIVEN
    component.subjectResult = {
      data: {
        "summary": {
          "studies": 2,
          "subjects": 0,
          "files": 10,
          "sessions": 5,
          "acquisitions": 30,
          "analyses": 0
        }
      },
    };
    // WHEN
    component.getSummaryInfo('Documentation');

    // THEN
    expect(component.summary).toEqual([
      {icon: 'file-attach', name: 'Files', value: 10},
      {icon: 'file-session', name: 'Sessions', value: 5},
      {icon: 'file-data-pull', name: 'Acquisitions', value: 30}
    ]);
  });

});
