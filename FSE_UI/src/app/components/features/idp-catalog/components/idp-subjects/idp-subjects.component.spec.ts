import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdpSubjectsComponent } from './idp-subjects.component';
import { IdpHelperService } from '../../services/idp-helper.service';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { KendoModule } from '../../../../../modules/kendo/kendo.module';
import { TableColumnsComponent } from '../../../../../shared/shared-components/table-columns/table-columns.component';
import subjectsJson from '../../../../../../assets/mockData/subjects.json';
import {  GridComponent as CustomGridComponent } from '../../../../../shared/shared-components/grid/grid.component';
import { GridComponent } from '@progress/kendo-angular-grid';

describe('IdpSubjectsComponent', () => {
  let component: IdpSubjectsComponent;
  let fixture: ComponentFixture<IdpSubjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IdpSubjectsComponent, CustomGridComponent,TableColumnsComponent],
      imports: [HttpClientTestingModule, KendoModule, FormsModule, GridComponent],
      providers: [
        {
          provide: IdpHelperService,
          useValue: {subjectsResult: of(subjectsJson) }
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdpSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show grid table if data is populated', () => {
    // GIVEN
    spyOn(TestBed.inject(IdpHelperService).subjectsResult, 'subscribe').and.callThrough();
    // WHEN
    component.ngOnInit();
    fixture.detectChanges();
    // THEN
    const gridTable = fixture.debugElement.query(By.css('.grid-container > app-grid')).nativeElement;
    expect(component.gridData).toBe(subjectsJson.data.items);
    expect(gridTable).toBeTruthy();
  });

  it('should next paginate to next page when scrolled bottom', () => {
    // GIVEN
    spyOn(TestBed.inject(IdpHelperService).subjectsResult, 'subscribe').and.callThrough();
    const subjectNextPageEmitterSpy = spyOn(component.subjectNextPageEmitter, 'emit');
    const kendoGridComponent = fixture.debugElement.query(By.directive(GridComponent));
    // WHEN
    component.ngOnInit();
    kendoGridComponent.triggerEventHandler('scrollBottom');
    fixture.detectChanges();
    // THEN
    expect(subjectNextPageEmitterSpy).toHaveBeenCalledOnceWith(1);
  });

  it('should emit sorting when sortChange event is trigger', () => {
    // GIVEN
    const mockSortEvent = [{ field: 'name', dir: 'asc' }];
    spyOn(TestBed.inject(IdpHelperService).subjectsResult, 'subscribe').and.callThrough();
    const subjectSortEmitterSpy = spyOn(component.subjectSortEmitter, 'emit');
    const kendoGridComponent = fixture.debugElement.query(By.directive(GridComponent));
    // WHEN
    component.ngOnInit();
    kendoGridComponent.triggerEventHandler('sortChange', mockSortEvent);
    fixture.detectChanges();
    // THEN
    expect(subjectSortEmitterSpy).toHaveBeenCalledOnceWith(
      { field: 'name', order: 'ASC' }
    );
  });
});
