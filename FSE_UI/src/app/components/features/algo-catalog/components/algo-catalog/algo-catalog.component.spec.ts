import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import AlgoCatalogJson from '../../../../../../assets/mockData/algo-catalog.json';
import { AlgoCatalogComponent } from './algo-catalog.component';
import { AlgorithmRestService } from '../../../../services/algorithm-rest.service';
import { BreadcrumbNavigationComponent } from '../../../../../shared/shared-components/breadcrumb-navigation/breadcrumb-navigation.component';
import { GridDetailComponent } from '../../../../../shared/shared-components/grid-detail/grid-detail.component';
import { SummaryComponent } from '../../../../../shared/shared-components/summary/summary.component';
import { NoResultsFoundComponent } from '../../../../../shared/shared-components/no-results-found/no-results-found.component';
import { GridComponent } from '@progress/kendo-angular-grid';
import { KendoModule } from '../../../../../modules/kendo/kendo.module';
import { SortDescriptor } from '@progress/kendo-data-query';
import { AlgoCatalogRequest } from '../../../../models/algorithmEto';
import AlgorithmDetailJson from '../../../../../../assets/mockData/algo-version-detail.json';
import { AlgoDetailViewComponent } from '../algo-detail-view/algo-detail-view.component';
import { ExpansionPanelComponent } from '../../../../../shared/shared-components/expansion-panel/expansion-panel.component';
import { FormatValuePipe } from '../../../../../shared/shared-components/format-value.pipe';

describe('AlgoCatalogComponent', () => {
  let component: AlgoCatalogComponent;
  let fixture: ComponentFixture<AlgoCatalogComponent>;

  const mockActivatedRoute = {
    snapshot: {
      paramMap: new Map<string, string>([['idpId', 'abcd1234']])
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AlgoCatalogComponent,
        BreadcrumbNavigationComponent,
        GridDetailComponent,
        SummaryComponent,
        NoResultsFoundComponent,
        AlgoDetailViewComponent,
        ExpansionPanelComponent
      ],
      imports: [HttpClientTestingModule, GridComponent, KendoModule],
      providers: [
        AlgorithmRestService,
        FormatValuePipe,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();
    
    fixture = TestBed.createComponent(AlgoCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show grid on initial load of component', () => {
    // GIVEN
    const catalogResult = JSON.parse(JSON.stringify(AlgoCatalogJson));
    const algoCatalogService = spyOn(
      TestBed.inject(AlgorithmRestService),
      'getAlgorthims'
    ).and.returnValue(of(catalogResult));
    // WHEN
    component.ngOnInit();
    fixture.detectChanges();
    // THEN
    const gridTable = fixture.debugElement.query(By.css('app-grid-detail')).nativeElement;
    expect(algoCatalogService).toHaveBeenCalled();
    expect(component.gridData).toBe(catalogResult.data.items);
    expect(gridTable).toBeTruthy();
  });

  it('should call the api with the column field and order of sort and display the grid', () => {
    // GIVEN
    const catalogResult = JSON.parse(JSON.stringify(AlgoCatalogJson));
    const payload = {
      sort: {
        field: 'abcd',
        order: 'ASC'
      }
    } as AlgoCatalogRequest;
    const sort = {
      field: 'abcd',
      dir: 'asc'
    } as SortDescriptor;
    const algoCatalogService = spyOn(
      TestBed.inject(AlgorithmRestService),
      'getAlgorthims'
    ).and.returnValue(of(catalogResult));
    // WHEN
    component.getSortedData(sort);
    fixture.detectChanges();
    // THEN
    const gridTable = fixture.debugElement.query(By.css('app-grid-detail')).nativeElement;
    expect(algoCatalogService).toHaveBeenCalledWith(payload);
    expect(component.gridData).toBe(catalogResult.data.items);
    expect(gridTable).toBeTruthy();
  });

  it('should call the api to when the pagination is trigger', () => {
    // GIVEN
    const catalogResult = JSON.parse(JSON.stringify(AlgoCatalogJson));
    const payload = {
      paignation: {
        currentPage: 2
      }
    } as AlgoCatalogRequest;
    const sort = {
      field: 'abcd',
      dir: 'asc'
    } as SortDescriptor;
    const algoCatalogService = spyOn(
      TestBed.inject(AlgorithmRestService),
      'getAlgorthims'
    ).and.returnValue(of(catalogResult));
    // WHEN
    component.getPaginatedData(1);
    fixture.detectChanges();
    // THEN
    const gridTable = fixture.debugElement.query(By.css('app-grid-detail')).nativeElement;
    expect(algoCatalogService).toHaveBeenCalledWith(payload);
    expect(component.gridData).toEqual(catalogResult.data.items);
    expect(gridTable).toBeTruthy();
  });

  it('should call algo detail view api and open the detail view', () => {
    // GIVEN
    const algorithm = {
      data: { algoversionuniqid: 'abcd1234' }
    };
    const algoRestServiceSpy = spyOn(
      TestBed.inject(AlgorithmRestService),
      'getAlgorithmVersionDetails'
    ).and.returnValue(of(AlgorithmDetailJson));
    // WHEN
    component.openAlgoDetails(algorithm);
    fixture.detectChanges();
    // THEN
    const detailViewElement = fixture.debugElement.query(By.css('app-algo-detail-view')).nativeElement;
    expect(algoRestServiceSpy).toHaveBeenCalledOnceWith('abcd1234');
    expect(component.algorithmVersionDetails).toBe(AlgorithmDetailJson);
    expect(detailViewElement).toBeTruthy();
  });
});
