import { Component, Input, OnInit } from '@angular/core';
import { DialogRef } from '@progress/kendo-angular-dialog';

@Component({
  selector: 'app-run-analysis-detail-pop-up',
  templateUrl: './run-analysis-detail-pop-up.component.html',
  styleUrl: './run-analysis-detail-pop-up.component.scss'
})
export class RunAnalysisDetailPopUpComponent{
  @Input() runAnalysisDetails: any;
  @Input() algoAnalysisUniqidOfSelectedRunDetail: any;
  parentTabs: any[] = [
    {
      value: 'IDP_Documentation',
      label: 'IDP Documentation',
      isSelected: true,
      enabled: true,
      // path: ['ui/exploreData'],
    },
    {
      value: 'configuration',
      label: 'Configuration',
      isSelected: false,
      enabled: true,
      // path: ['ui/exploreData'],
    },
    {
      value: 'log',
      label: 'Log',
      isSelected: false,
      enabled: true,
      // path: ['ui/exploreData'],
    }
  ];
  // configData: any =  "{ “debug”: false, “siemens CSA”: false, “derived metadata”: true, “tag”: “grp-31-file-metadata-importer” }";
  selectedTab: string = 'IDP_Documentation';
  logContent : any ="";
  configData: any;
  logsData: any;
  inputFileColumns: any = [
    {
      "name": "Input",
      "id": "file",
      "default": true,
      "checked": true,
      "width": 150,
      "order": 1,
      "hasIcon": true,
      "icon": "Outlined-data",
      "hasTooltip": true,
      "toolTipIcon": "circle_info",
      "displayAsDot": false,
      "displayAsCount": false
    },
    {
      "name": "",
      "id": "type",
      "default": true,
      "checked": true,
      "width": 80,
      "order": 2,
      "hasIcon": false,
      "hasTooltip": false,
      "displayAsDot": false,
      "displayAsCount": false
    }
  ]

  outputFileColumns: any = [
    {
      "name": "Output",
      "id": "file",
      "default": true,
      "checked": true,
      "width": 150,
      "order": 1,
      "hasIcon": true,
      "icon": "Outlined-export",
      "hasTooltip": true,
      "toolTipIcon": "circle_info",
      "displayAsDot": false,
      "displayAsCount": false
    },
    {
      "name": "",
      "id": "type",
      "default": true,
      "checked": true,
      "width": 80,
      "order": 2,
      "hasIcon": false,
      "hasTooltip": false,
      "displayAsDot": false,
      "displayAsCount": false
    }
  ]

  inputFileGridData: any;
  outputFileGridData: any;
  windowHeight = window.innerHeight;
  
  constructor(private dialogRef: DialogRef){

  }
  close(): void {
    this.dialogRef.close();
  }

  ngOnInit(){
    console.log("runAnalysisDetailsfrompopup", this.runAnalysisDetails);
    this.configData = this.runAnalysisDetails.data.items;
    this.logsData = this.runAnalysisDetails.data.logs;
    this.inputFileGridData = this.runAnalysisDetails.data.inputfile;
    this.outputFileGridData = this.runAnalysisDetails.data.outputfile;
  }

  getSelectedTabInfo(event: any) {
    this.getSelectedTabData(event.value)
  };

  getSelectedTabData(tabName: string) {
    console.log("tabName", tabName);
    this.selectedTab = tabName;
    switch(tabName) {
      // case 'IDP_Documentation':
      //   this.getIDPResult(this.idpID, 1);
      //   break;
      // case 'Subjects':
      //   this.getSubjectData(this.idpID);
      //   break;
      // case 'Files':
      //   this.getFilesData(this.idpID);
      //   break;
  
      default:
        break;
    }
  }
}
