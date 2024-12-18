import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdpDetailComponent } from './idp-detail.component';
import { IdpRestService } from '../../../../services/idp-rest.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BreadcrumbNavigationComponent } from '../../../../../shared/shared-components/breadcrumb-navigation/breadcrumb-navigation.component';
import { FilterBadgeComponent } from '../../../../../shared/shared-components/filter-badge/filter-badge.component';
import SubjectsJson from '../../../../../../assets/mockData/subjects.json';
import FilesJson from '../../../../../../assets/mockData/files.json';
import { IdpSubjectAndFileRequestEto } from '../../../../models/IdpEto';
import { PaginationEto } from '../../../../models/pageRequest';

describe('IdpDetailComponent', () => {
  let component: IdpDetailComponent;
  let fixture: ComponentFixture<IdpDetailComponent>;
  
  const mockActivatedRoute = {
    snapshot: {
      paramMap: new Map<string, string>([['idpId', 'abcd1234']])
    }
  };
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IdpDetailComponent, BreadcrumbNavigationComponent, FilterBadgeComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
        IdpRestService,
      ],
    }).compileComponents();
    
    fixture = TestBed.createComponent(IdpDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should check getSelectedTabInfo function', () => {
    const data = { value: 'Subject' }
    component.getSelectedTabInfo(data)
    expect(component.selectedTab).toBeDefined();
  });

  it('should format versions 1 to 9 as v0X', () => {
    expect(component.formatVersion('1.0')).toBe('v01');
    expect(component.formatVersion('5.1')).toBe('v05');
  });

  it('should format versions 10 and above as vX', () => {
    expect(component.formatVersion('10.0')).toBe('v10');
    expect(component.formatVersion('15.2')).toBe('v15');
    expect(component.formatVersion('20.3')).toBe('v20');
  });

  it('should return correct metrics for Files', () => {
    const result = component.showMetricBasedOnSelectedTab('Files');
    expect(result).toEqual({
      files: 'file-attach',
      sessions: 'file-session',
      acquisitions: 'file-data-pull',
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check getSelectedTabInfo function', () => {
    const data = { value: 'Subjects' }
    component.getSelectedTabInfo(data)
    expect(component.selectedTab).toBeDefined();
  });

  [
    {
      name: 'IDP_Documentation',
      method: 'getIDPResult' as keyof IdpDetailComponent
    },
    {
      name: 'Subjects',
      method: 'getSubjectData' as keyof IdpDetailComponent
    },
    {
      name: 'Files',
      method: 'getFilesData' as keyof IdpDetailComponent
    }
  ].forEach((tab) => {
    it(`should call indiviual method to get data for ${tab.name} tab`, () => {
      // GIVEN
      const tabSpecificSpy = spyOn(component, `${tab.method}`).and.callThrough();
      // WHEN
      component.getSelectedTabData(tab.name);
      // THEN
      if (tab.name === 'IDP_Documentation') {
        expect(tabSpecificSpy).toHaveBeenCalledOnceWith('abcd1234', 1)
      } else {
        expect(tabSpecificSpy).toHaveBeenCalledOnceWith('abcd1234')
      }
    });
  });

  [
    {
      name: 'Subjects',
      method: 'getSubjectsByIdp' as keyof IdpRestService,
      result: SubjectsJson
    },
    {
      name: 'Files',
      method: 'getFilesByIdp' as keyof IdpRestService,
      result: FilesJson
    }
  ].forEach((tab) => {
    it(`should call rest api for ${tab.name} tab`, () => {
      // GIVEN
      const idpRestServiceSpy = spyOn(TestBed.inject(IdpRestService), `${tab.method}`).and.returnValue(of(tab.result));
      // WHEN
      component.getSelectedTabData(tab.name);
      // THEN
      expect(idpRestServiceSpy).toHaveBeenCalledWith('abcd1234', undefined);
    });
  });

  [
    {
      name: 'Subjects',
      method: 'getSubjectsByIdp' as keyof IdpRestService,
      sortColumn: 'SubjectNumber',
      result: SubjectsJson
    },
    {
      name: 'Files',
      method: 'getFilesByIdp' as keyof IdpRestService,
      sortColumn: 'FileModality',
      result: FilesJson
    }
  ].forEach((tab) => {
    it(`should sort by calling rest api for ${tab.name} tab`, () => {
      // GIVEN
      const sort = {
        field: tab.sortColumn,
        order: 'DESC'
      }
      const idpRestServiceSpy = spyOn(TestBed.inject(IdpRestService), `${tab.method}`).and.returnValue(of(tab.result));
      // WHEN
      if(tab.name === 'Subjects') {
        component.sortSubjects(sort);
      } else {
        component.sortFiles(sort);
      }
      // THEN
      expect(idpRestServiceSpy).toHaveBeenCalledWith('abcd1234', { sort } as IdpSubjectAndFileRequestEto);
    });
  });

  [
    {
      name: 'Subjects',
      method: 'getSubjectsByIdp' as keyof IdpRestService,
      pageNumber: 1,
      result: SubjectsJson
    },
    {
      name: 'Files',
      method: 'getFilesByIdp' as keyof IdpRestService,
      pageNumber: 5,
      result: FilesJson
    }
  ].forEach((tab) => {
    it(`should paginate to next page by calling rest api for ${tab.name} tab`, () => {
      // GIVEN
      const pagination = { currentPage: tab.pageNumber + 1 } as PaginationEto;
      const payLoad = {
        pagination,
        filters: undefined
      };
      const idpRestServiceSpy = spyOn(TestBed.inject(IdpRestService), `${tab.method}`).and.returnValue(of(tab.result));
      // WHEN
      if(tab.name === 'Subjects') {
        component.subjectsResult = SubjectsJson;
        component.paginateSubjects(tab.pageNumber);
      } else {
        component.filesResult = FilesJson;
        component.paginateFiles(tab.pageNumber);
      }
      // THEN
      expect(idpRestServiceSpy).toHaveBeenCalledWith('abcd1234', payLoad as unknown as IdpSubjectAndFileRequestEto);
    });
  });
});
