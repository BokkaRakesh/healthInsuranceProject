import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';

import { ArdDetailComponent } from './ard-detail.component';
import { ArdRestService } from '../../../../services/ard-rest.service';
import { BreadcrumbNavigationComponent } from '../../../../../shared/shared-components/breadcrumb-navigation/breadcrumb-navigation.component';
import { ArdDocumentationTabComponent } from '../ard-documentation-tab/ard-documentation-tab.component';
import ArdResultJson from '../../../../../../assets/mockData/getArd.json';
import { TabNavigationComponent } from '../../../../../shared/shared-components/tab-navigation/tab-navigation.component';
import { DataSummaryDetailComponent } from '../../../../../shared/shared-components/data-summary-detail/data-summary-detail.component';
import { CriteriaDisplayComponent } from '../../../../../shared/shared-components/criteria-display/criteria-display.component';
import { AccessControlComponent } from '../../../../../shared/shared-components/access-control/access-control.component';
import { InsightsComponent } from '../../../../../shared/shared-components/insights/insights.component';

describe('ArdDetailComponent', () => {
  let component: ArdDetailComponent;
  let fixture: ComponentFixture<ArdDetailComponent>;

  const mockActivatedRoute = {
    snapshot: {
      paramMap: new Map<string, string>([['ardId', 'abcd1234']])
    }
  };

  const mocToastrService = jasmine.createSpyObj(['success']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ArdDetailComponent,
        BreadcrumbNavigationComponent,
        ArdDocumentationTabComponent,
        TabNavigationComponent,
        DataSummaryDetailComponent,
        CriteriaDisplayComponent,
        AccessControlComponent,
        InsightsComponent
      ],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
        { provide: ToastrService, useValue: mocToastrService },
        ArdRestService
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArdDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call rest api to get ard result on page load', () => {
    // GIVEN
    const ardRestService = spyOn(
      TestBed.inject(ArdRestService),
      'getArdDetail'
    ).and.returnValue(of(ArdResultJson));
    // WHEN
    component.ngOnInit();
    // THEN
    expect(ardRestService).toHaveBeenCalledOnceWith('abcd1234');
  });

  it('should show Ard documentation tab when tab clicked', () => {
    // GIVEN
    const ardRestService = spyOn(
      TestBed.inject(ArdRestService),
      'getArdDetail'
    ).and.returnValue(of(ArdResultJson));
    // WHEN
    component.getSelectedTabData('Documentation');
    fixture.detectChanges();
    // THEN
    const ardDocumentationTab = fixture.debugElement.query(By.css('app-ard-documentation-tab')).nativeElement;
    expect(ardRestService).toHaveBeenCalledOnceWith('abcd1234');
    expect(ardDocumentationTab).toBeTruthy();
  });
});
