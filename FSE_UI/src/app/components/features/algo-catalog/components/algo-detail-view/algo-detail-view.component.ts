import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SVGIcon, chevronDownIcon, chevronUpIcon } from '@progress/kendo-svg-icons';

@Component({
  selector: 'app-algo-detail-view',
  templateUrl: './algo-detail-view.component.html',
  styleUrl: './algo-detail-view.component.scss',
})
export class AlgoDetailViewComponent implements OnInit {
  @Input() algorithmVersionDetails: any;
  @Output() closeDetailViewerEmitter = new EventEmitter();
  arrowDown: SVGIcon = chevronDownIcon;
  arrowUp: SVGIcon = chevronUpIcon;
  selectedTab: string = 'documentation';
  toggleDesktop = false;
  toggleVertex = false;
  metaInformations: any[] = [];
  algorithmSystemMap: Map<string, {type: string, location: string}[]> = new Map();
  
  // Algorithm meta Information Mapper
  metaInfoMapper = [
    { label: 'Author', dbColumn: 'createdby' },
    { label: 'Maintainer', dbColumn: 'updatedby' },
    { label: 'Version', dbColumn: 'versionref' },
    { label: 'API Key Required', dbColumn: 'api_key_required' },
    { label: 'Type', dbColumn: 'type' },
    { label: 'Source', dbColumn: 'source' },
    { label: 'URL', dbColumn: 'url' },
  ];

  algoSystemMapper = [
    { label: 'Desktop', dbColumn: 'Desktop' },
    { label: 'Vertex', dbColumn: 'Vertex' },
    { label: 'HPC', dbColumn: 'HPC' },
  ]

  ngOnInit(): void {
    this.mappedMetaInfo();
    this.mappedAlgoSystem();
  }

  mappedMetaInfo(): void {
    const summaryInfo = this.algorithmVersionDetails?.data?.summary;
    this.metaInfoMapper.forEach((mapInfo) => {
      this.metaInformations.push({
        label: mapInfo.label,
        value: summaryInfo[mapInfo.dbColumn] ? summaryInfo[mapInfo.dbColumn] : '-'
      });
    });
  }

  mappedAlgoSystem(): void {
    const algoSystemItems = this.algorithmVersionDetails.data['items'];
    this.algoSystemMapper.forEach((system) => {
      const algorithmSystem = algoSystemItems[system.dbColumn];
      if (algorithmSystem) {
        this.algorithmSystemMap.set(system.label, algorithmSystem);
      }
    });
  }

  requestAccessCall(): void {
    console.log('requestAccessCall');
  }
  // Button Actions
  onViewAnalysisRun() {
    console.log('View Analysis Runs Clicked');
  }

  onRunAnalysis() {
    console.log('Run Analysis Clicked');
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  onClose() {
    this.closeDetailViewerEmitter.emit();
  }
}
