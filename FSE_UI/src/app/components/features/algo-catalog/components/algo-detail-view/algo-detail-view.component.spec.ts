import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlgoDetailViewComponent } from './algo-detail-view.component';
import AlgorithmDetailJson from '../../../../../../assets/mockData/algo-version-detail.json';
import { ExpansionPanelComponent } from '../../../../../shared/shared-components/expansion-panel/expansion-panel.component';

describe('AlgoDetailViewComponent', () => {
  let component: AlgoDetailViewComponent;
  let fixture: ComponentFixture<AlgoDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlgoDetailViewComponent, ExpansionPanelComponent],
    })
    .compileComponents();
    fixture = TestBed.createComponent(AlgoDetailViewComponent);
    component = fixture.componentInstance;
    component.algorithmVersionDetails = JSON.parse(JSON.stringify(AlgorithmDetailJson));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test 1', () => {
    // GIVEN
    const metaInformation = [
      { label: 'Author', value: 'Payal Sharma' },
      { label: 'Maintainer', value: 'Payal Sharma' },
      { label: 'Version', value: '1.0-ga' },
      { label: 'API Key Required', value: 'Yes' },
      { label: 'Type', value: 'Analysis' },
      { label: 'Source', value: 'Desktop, HPC' },
      { label: 'URL', value: 's3://gip-data-main/idp/a3d24c2d-c5fd/ard/da4ef7b9-2a97/analysis/bb97970b-e766/' }
    ];
    const algoSystemMap = new Map<string, {type: string, location: string}[]>([
      ['HPC', [
        {
          type: 'HPC',
          location: 's3://gip-data-main/idp/a3d24c2d-c5fd/ard/da4ef7b9-2a97/analysis/bb97970b-e766/'
        }
      ]],
      ['Desktop', [
        {
          type: 'Mac',
          location: 's3://gip-data-main/idp/a3d24c2d-c5fd/ard/da4ef7b9-2a97/analysis/bb97970b-e766/'
        },
        {
          type: 'Windows',
          location: 's3://gip-data-main/idp/a3d24c2d-c5fd/ard/da4ef7b9-2a97/analysis/bb97970b-e766/'
        }
      ]]
    ]);
    // WHEN
    fixture.detectChanges();
    // THEN
    expect(component.metaInformations).toEqual(metaInformation);
    expect(component.algorithmSystemMap).toEqual(algoSystemMap);
  });
});
