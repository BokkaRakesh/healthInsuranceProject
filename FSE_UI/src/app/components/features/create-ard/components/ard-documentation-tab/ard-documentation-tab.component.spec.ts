import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { ArdDocumentationTabComponent } from './ard-documentation-tab.component';
import { ArdRestService } from '../../../../services/ard-rest.service';
import { CriteriaDisplayComponent } from '../../../../../shared/shared-components/criteria-display/criteria-display.component';
import { AccessControlComponent } from '../../../../../shared/shared-components/access-control/access-control.component';
import { InsightsComponent } from '../../../../../shared/shared-components/insights/insights.component';
import ArdResultJson from '../../../../../../assets/mockData/getArd.json';

describe('ArdDocumentationTabComponent', () => {
  let component: ArdDocumentationTabComponent;
  let fixture: ComponentFixture<ArdDocumentationTabComponent>;

  const mocToastrService = jasmine.createSpyObj(['success']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ArdDocumentationTabComponent,
        CriteriaDisplayComponent,
        AccessControlComponent,
        InsightsComponent
      ],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        ArdRestService,
        { provide: ToastrService, useValue: mocToastrService },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArdDocumentationTabComponent);
    component = fixture.componentInstance;
    component.ardResult = ArdResultJson; 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render ard documentation page with all content', () => {
    // GIVEN
    component.users = [{
      initials: 'AZ',
      name: 'Alyson Zorko',
      permission: 'read-write',
    }];
    component.insights = [
      {
        name: 'CAFE-14_ROSA-ALPHA_02_24_2024_1:42',
        status: 'inprogress',
        value: 400,
      }
    ];
    component.inclusionCriteria = [
      {
        label: 'Country',
        value: 'USA',
      }
    ];
    // WHEN
    fixture.detectChanges();
    // THEN
    const ardDetailInfoBoxes = fixture.debugElement.queryAll(By.css('.info-box'));
    const critieraDisplayComponent = fixture.debugElement.query(By.css('app-criteria-display'));
    const accessControlComponent = fixture.debugElement.query(By.css('app-access-control'));
    const insightsComponent = fixture.debugElement.query(By.css('app-insights'));
    expect(ardDetailInfoBoxes.length).toBe(4);
    expect(critieraDisplayComponent.nativeElement).toBeTruthy();
    expect(accessControlComponent.nativeElement).toBeTruthy();
    expect(insightsComponent.nativeElement).toBeTruthy();
  });

  it('should call rest api to save the description', () => {
    // GIVEN
    const description = 'Description for ard.'
    const apiResponse = {
      status: 'success',
      message: ' ARD updated successfully',
      description: 'Description for ard.',
    };
    const ardRestServiceSpy = spyOn(
      TestBed.inject(ArdRestService),
      'addDescriptionToArd'
    ).and.returnValue(of(apiResponse));
    // WHEN
    component.saveDescription(description);
    // THEN
    expect(ardRestServiceSpy).toHaveBeenCalledOnceWith('c38f5c49-6cb2-4127-9113-d0ce6e67ebb7', description);
    expect(mocToastrService.success).toHaveBeenCalled();
  });
});
