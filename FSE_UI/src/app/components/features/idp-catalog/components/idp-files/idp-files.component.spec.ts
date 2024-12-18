import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdpFilesComponent } from './idp-files.component';
import { IdpHelperService } from '../../services/idp-helper.service';
import filesJson from '../../../../../../assets/mockData/files.json';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { GridComponent as CustomGridComponent } from '../../../../../shared/shared-components/grid/grid.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { KendoModule } from '../../../../../modules/kendo/kendo.module';
import { TableColumnsComponent } from '../../../../../shared/shared-components/table-columns/table-columns.component';
import { FormsModule } from '@angular/forms';
import { GridComponent } from '@progress/kendo-angular-grid';

describe('IdpFilesComponent', () => {
  let component: IdpFilesComponent;
  let fixture: ComponentFixture<IdpFilesComponent>;

  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IdpFilesComponent, CustomGridComponent, TableColumnsComponent],
      imports: [HttpClientTestingModule, KendoModule, FormsModule, GridComponent],
      providers: [
        {
          provide: IdpHelperService,
          useValue: {filesResult: of(filesJson) }
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdpFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show grid table if data is populated', () => {
    // GIVEN
    spyOn(TestBed.inject(IdpHelperService).filesResult, 'subscribe').and.callThrough();
    // WHEN
    component.ngOnInit();
    fixture.detectChanges();
    // THEN
    const gridTable = fixture.debugElement.query(By.css('.grid-container > app-grid')).nativeElement;
    expect(component.gridData).toBe(filesJson.data.items);
    expect(gridTable).toBeTruthy();
  });

  it('should next paginate to next page when scrolled bottom', () => {
    // GIVEN
    spyOn(TestBed.inject(IdpHelperService).filesResult, 'subscribe').and.callThrough();
    const filesNextPageEmitterSpy = spyOn(component.filesNextPageEmitter, 'emit');
    const kendoGridComponent = fixture.debugElement.query(By.directive(GridComponent));
    // WHEN
    component.ngOnInit();
    kendoGridComponent.triggerEventHandler('scrollBottom');
    fixture.detectChanges();
    // THEN
    expect(filesNextPageEmitterSpy).toHaveBeenCalledOnceWith(1);
  });

  it('should emit sorting when sortChange event is trigger', () => {
    // GIVEN
    const mockSortEvent = [{ field: 'name', dir: 'asc' }];
    spyOn(TestBed.inject(IdpHelperService).filesResult, 'subscribe').and.callThrough();
    const filesSortEmitterSpy = spyOn(component.filesSortEmitter, 'emit');
    const kendoGridComponent = fixture.debugElement.query(By.directive(GridComponent));
    // WHEN
    component.ngOnInit();
    kendoGridComponent.triggerEventHandler('sortChange', mockSortEvent);
    fixture.detectChanges();
    // THEN
    expect(filesSortEmitterSpy).toHaveBeenCalledOnceWith(
      { field: 'name', order: 'ASC' }
    );
  });
});
