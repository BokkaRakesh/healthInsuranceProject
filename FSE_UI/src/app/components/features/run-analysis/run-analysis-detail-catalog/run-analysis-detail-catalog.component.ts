import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DialogRef, DialogService, DialogCloseResult } from '@progress/kendo-angular-dialog';
import { SVGIcon, chevronDownIcon, chevronUpIcon, pencilIcon } from '@progress/kendo-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PaginationEto } from '../../../models/pageRequest';
import { RunAnalysisAlgoCatalogService } from '../services/run-analysis-algo-catalog.service';
import { AddFilesComponent } from '../add-files/add-files.component';
import runColumns from '../../../../../assets/columnDefinition/run-columns.json';
// import filesColumns from '../../../../../assets/columnDefinition/files-column.json';
import runFilesData from '../../../../../assets/mockData/run-analysis-add-files.json';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subject, timer } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { RunAnalysisDetailPopUpComponent } from '../run-analysis-detail-pop-up/run-analysis-detail-pop-up.component';
import { AlgorithmRestService } from '../../../services/algorithm-rest.service';
import { ArdRestService } from '../../../services/ard-rest.service';

@Component({
  selector: 'app-run-analysis-detail-catalog',
  templateUrl: './run-analysis-detail-catalog.component.html',
  styleUrl: './run-analysis-detail-catalog.component.scss'
})
export class RunAnalysisDetailCatalogComponent implements OnInit {
  filesColumns: any = [{
    "name": "Files",
    "id": "file",
    "default": true,
    "checked": true,
    "width": 150,
    "order": 1,
    "hasIcon": false,
    "hasTooltip": true,
    "toolTipIcon": "circle_info",
    "displayAsDot": false,
    "displayAsCount": false
  }];
  gridFilesData = runFilesData;
  selectedAlgoDetails: any;
  ardDetails: any[] = [];
  selectedARDUniqId: any;
  algoversionuniqid: any;
  showOnly = 'Show Only';
  ardData: any;
  selectedViewAnalysisData: any;
  newAnalysisClicked = false;
  indexValue = 0;
  decFields = [
    { id: 'acquisitions', name: 'Acquisitions', value: 'Phase IV' },
    // {id: 'arduniqid', name: 'Scientific Area', value: 'Oncology'},
    // {id: 'dataproductuniqid', name: 'Indication', value: 'Cancer'},
    // {id: 'dataproductversionuniqid', name: 'Data Classification', value: 'Clinical Data'},
    { id: 'datasources', name: 'Data Sources', value: 'Phase IV' },
    // {id: 'description', name: 'Subjects', value: '20'},
    { id: 'files', name: 'Files', value: '650' },
    { id: 'modality', name: 'Modality', value: '80' },
    { id: 'name', name: 'Name', value: 'Imaging, Clinical' },
    { id: 'sessions', name: 'Sessions', value: 'CT, MRI, OCT' },
    { id: 'status', name: 'Status', value: 'CT, MRI, OCT' },
    { id: 'studyindication', name: 'Indication', value: 'CT, MRI, OCT' },
    { id: 'studyphase', name: 'Clinical Phase', value: 'CT, MRI, OCT' },
    { id: 'studyscientificarea', name: 'Scientific Area', value: 'CT, MRI, OCT' },
    { id: 'subjects', name: 'Subjects', value: 'CT, MRI, OCT' }
  ];
  showAlgoResults = false;
  resultFilters: any[] = [];
  algoBtnLabel = 'Run Analysis'
  gridColumns: any = runColumns;
  arrowDown: SVGIcon = chevronDownIcon;
  arrowUp: SVGIcon = chevronUpIcon;
  editIcon: SVGIcon = pencilIcon;
  public icons = { pencilIcon: pencilIcon };
  gridData: any;
  gridRunData: any;
  arrowDown2: SVGIcon = chevronDownIcon;
  arrowUp2: SVGIcon = chevronUpIcon;
  configurationForm!: FormGroup;
  documentationForm!: FormGroup;
  showAlgoPopup = false;
  showConfiguration = false;
  showDocumentation = false;
  selectedCatalog = '';
  selectedAlgoCatalogData: any[] = [];
  selectedARDCatalogData: any[] = [];
  configurationData: any;
  documentationData: any;
  algoSelected: boolean = true;
  ardSelected: boolean = true;
  runAlgoNotFound = true;
  algoConfigurationsData: any;
  idpId: any;
  ardId: any;
  analysisUniqid: any
  resultFiltersStatusCount: any;
  // filesColumns: any = [
  //   {
  //     "name": "Files",
  //     "id": "name",
  //     "default": true,
  //     "checked": true,
  //     "width": 150,
  //     "order": 1,
  //     "hasIcon": true,
  //     "icon": "Outlined-data",
  //     "hasTooltip": true,
  //     "toolTipIcon": "circle_info",
  //     "displayAsDot": false,
  //     "displayAsCount": false
  //   }
  // ]

  icECtable = [
    { id: 'ic', value: 'Inclusion Criteria' },
    { id: 'ec', value: 'Exclusion Criteria' }

  ]
  pagination!: PaginationEto;

  runAnalysisDescColumns: any = [
    {
      "name": "Inclusion Criteria",
      "id": "icid",
      "default": true,
      "checked": false,
      "width": 200,
      "order": 1,
      "hasIcon": false,
      "hasTooltip": false
    },
    {
      "name": "Exclusion Criteria",
      "id": "ecid",
      "default": true,
      "checked": false,
      "width": 200,
      "order": 2,
      "hasIcon": false,
      "hasTooltip": false
    },
  ]
  configurationFormValues: any;
  algojobuniqid: any;
  runAnalysisDetails: any;
  selectedARDVersionUniqID: any;
  runCompleted = false;
  private stopTimer$ = new Subject<void>();
  showViewAnalysis = false;
  runAnalysisClicked = false;
  runError = false;
  statusIcon = [
    { id: 'in_progress', icon: '../assets/images/in_progress.svg', showing: 'Show Only' },
    { id: 'fail', icon: '../assets/images/errored.svg', showing: 'Show Only' },
    { id: 'completed', icon: '../assets/images/completed.svg', showing: 'Show Only' }
  ];
  selectedRunAnalysisStatus: any;
  filesGridData: any;
  algoAnalysisUniqidOfSelectedRunDetail: any;
  height = 'auto';

  constructor(
    private dialogService: DialogService,
    private router: Router,
    private ardRestService: ArdRestService,
    private route: ActivatedRoute,
    private algorithmRestService: AlgorithmRestService,
    private toastrService: ToastrService,
    private fb: FormBuilder, private runAnalysisAlgoCatalogService: RunAnalysisAlgoCatalogService
  ) { }

  ngOnInit() {
    //  this.getARDDescCatalogData();
    // this.getAlgoConfigurationDetails();
    // this.getRunAnalysisListData();
    const routeNav = this.router.getCurrentNavigation();
    this.route.paramMap.subscribe((params: any) => {
      this.idpId = params['params'].idpId;
      this.ardId = params['params'].ardId;
      console.log("id", params['params'].idpId);
      console.log("ardid", this.ardId);
    });
    console.log("routenav", routeNav);

    if (this.ardId) {
      this.selectedARDUniqId = this.ardId;
      this.getARDDetails();
    }

    // this.getFilesData();  // anable this if you want check mock data for aelected files of add files section
  }

  getRunAnalysisListData(data?: any, index?: number) {
    if(index){
      this.indexValue = index;
    }
    const statusValues = [];
    let raPayload: any;
    if (data) {
      statusValues.push(data?.status);
      raPayload = {
        pagination: {
          currentPage: 1
        },
        filters: [
          {
            id: 'Status',
            type: 'text',
            inclusion: true,
            values: statusValues
          }
        ]
      }
    };
    timer(30000)
      .pipe(
        switchMap(() => this.runAnalysisAlgoCatalogService.getRunAnalysisListService(this.analysisUniqid, raPayload)),
        takeUntil(this.stopTimer$)
      )
      .subscribe((result) => {
        if (result) {
          console.log("run data", result);
          console.log("run columns", runColumns);
          this.gridRunData = result.data.items;
          this.selectedRunAnalysisStatus = this.resultFiltersStatusCount.map((item: any) => ({ ...item }));
          this.selectedRunAnalysisStatus[this.indexValue]['showing'] = 'Showing Only'; //Need to discuss
          // console.log("algodata1511", this.gridData.length);
          this.pagination = result.data['pagination'];
          // this.loaderService.hideLoader();
        }
      });
  }


  refreshRunAnalysis() {
    const raPayload = {};
    this.runAnalysisAlgoCatalogService.getRunAnalysisListService(this.analysisUniqid, raPayload)
      .subscribe((result) => {
        console.log("run data", result);
        console.log("run columns", runColumns);
        this.gridRunData = result.data.items;
        // console.log("algodata1511", this.gridData.length);
        this.pagination = result.data['pagination'];
        // this.loaderService.hideLoader();
      });
  }

  // getARDDescCatalogData() {

  //   this.runAnalysisAlgoCatalogService.getARDDescCatalogDataService(this.idpId, ardPayload).subscribe((result) => {
  //     this.gridData = result.data['items'];
  //     console.log("algodescdata", this.gridData);
  //     this.pagination = result.data['pagination'];
  //     // this.loaderService.hideLoader();
  //   });
  // }

  getFilesData(){
       this.runAnalysisAlgoCatalogService.getSelectedFilesOfRunAnalysis().subscribe((result: any) => {
      this.filesGridData = result.data.inputfile;
      console.log("addfilesdata", this.filesGridData);
      // this.loaderService.hideLoader();
    });
  }
  


  getSelectedAlgo(data: any) {
    this.selectedAlgoDetails = data;
    this.algoversionuniqid = this.selectedAlgoDetails.data.algoversionuniqid;
    console.log("151", data);
    this.getAlgoConfigurationDetails(this.algoversionuniqid);
    this.showAlgoPopup = false;
  }


  addFiles() {
    const dialogRef: DialogRef = this.dialogService.open({
      content: AddFilesComponent
    });
    const instance = dialogRef.content.instance;
    instance.ardIDofRunAnalysis = this.ardId;
    dialogRef.result.subscribe((res: any) => {
      if (!(res instanceof DialogCloseResult)) {
        let filesgridData = [];
       for(let data of res){
        filesgridData.push({"file": data.name})
       }
        this.filesGridData = filesgridData;
        console.log("filesgriddataalllllllll 290",filesgridData);
      }
    });
  }
  openRAAlgoCatalogDialog() {
    this.showAlgoPopup = true;
    this.selectedCatalog = 'Algo';
    console.log("edit algo");
   
    // const dialogRef: DialogRef = this.dialogService.open({
    //   content: RunAnalysisAlgoCatalogPopUpComponent

    // });
    // dialogRef.result.subscribe((res) => {
    //   console.log("result", res);
    //   if (!(res instanceof DialogCloseResult)) { 
    //     console.log("result", res);
    //    }
    // });
  }

  openRAArdCatalogDialog() {
    this.showAlgoPopup = true;
    this.selectedCatalog = 'ARD';
    this.ardDetails = [];
    // const dialogRef: DialogRef = this.dialogService.open({
    //   content: RunAnalysisArdCatalogPopUpComponent
    // });
    // dialogRef.result.subscribe((res) => {
    //   console.log("result", res);
    //   if (!(res instanceof DialogCloseResult)) { 
    //     console.log("result", res);
    //    }
    // });
  }

  dialogAction(event: any) {
    this.showAlgoPopup = false;
    this.showViewAnalysis = event;
  }

  getAlgoConfigurationDetails(id: any): void {
    console.log("getting algo details")
    this.algoConfigurationsData = [];
    this.runAnalysisAlgoCatalogService.getAlgoConfigurationDataService(id).subscribe((result) => {
      console.log("got algo details")
      this.showConfiguration = true;
      this.algoConfigurationsData = result;
    });
  }


  selectedAlgoRow(event: any): void {
    this.selectedAlgoCatalogData.push(event);
    console.log("selectedAlgoCatalogData", this.selectedAlgoCatalogData);
    // this.getAlgoConfigurationDetails(this.algoversionuniqid);
    // this.getAlgoDocumentationDetails();
  }

  // On Run Analysis Button Click
  runAnalysis(data?: any) {
    if (data) {
      console.log("runclickd", data);
      this.runAnalysisClicked = true;
    } else {
      this.runAnalysisClicked = true;
    }
    console.log('RunAnalysis() Triggered');
    console.log('ardversionuniqid: ', this.selectedARDVersionUniqID);
    this.algoBtnLabel = 'Running...'
    // this.algoBtnLabel = 'Re-Run Errored...'
    // this.resultFiltersData(); // local test middle run section
    // Dynamic
    const payload = {
      "arduniqid": this.selectedARDUniqId,
      "ardversionuniqid": this.selectedARDVersionUniqID,
      "algoversionuniqid": this.algoversionuniqid,
      "config": this.configurationFormValues,
      "files": []
    };
    this.runAnalysisAlgoCatalogService.getRunAnalysisService(payload)
      .subscribe((result: any) => {
        if (result) {
          if (result) {
            this.resultFilters = result;
            this.analysisUniqid = result.AnalysisUniqID;
            if (result.message) {
              this.toastrService.success(result.message);
            }
            if(this.analysisUniqid){
              this.resultFiltersData();
              this.runAnalysisStatusCountService();
            }
             this.getRunAnalysisListData(); // TODO: Need to check
          }
        }
      }, (error) => {
        this.runError = true;
        console.error('error.error', error.error)
      }
      )
  }

  resultFiltersData() {
    this.runAnalysisAlgoCatalogService.runAnalysisStatusCountService(this.analysisUniqid)
      .subscribe((result: any) => {
        if (result) {
          const resultFiltersStatusCount = result.data.items;
          console.log('resultFiltersStatusCount: ', this.resultFiltersStatusCount);
          // this.resultFiltersStatusCount.filter(x => x.status === this.statusIcon);
          this.resultFiltersStatusCount = resultFiltersStatusCount.map((data: any) => {
            const rowData = this.statusIcon.find(icon => icon.id === data.status);
            return rowData ? { ...data, icon: rowData.icon, showing: rowData.showing } : data;
          });
          console.log('combinedData: ', this.resultFiltersStatusCount);
          this.selectedRunAnalysisStatus = [...this.resultFiltersStatusCount];
        }
      });
    // this.resultFilters = this.runAnalysisAlgoCatalogService.getresultFiltersDataService();
  }

  //call this button afterRun Analysis Button Click
  runAnalysisStatusCountService() {
    timer(30000)
      .pipe(
        switchMap(() => this.runAnalysisAlgoCatalogService.runAnalysisStatusCountService(this.analysisUniqid)),
        takeUntil(this.stopTimer$)
      )
      .subscribe(result => {
        if (result) {
          this.resultFilters = result.data.items;
          if (result.data.items.message === 'completed') {
            console.log("295 insidestatuscount", result.data.message);
            this.runCompleted = true;
            this.stopTimer$.next();
          }
          console.log("runAnalysisBtnClick", result);
        }

      });
  }


  selectedARDRow(event: any): void {
    this.selectedARDCatalogData = [];
    this.selectedARDCatalogData.push(event);
    this.selectedARDUniqId = event.ARDUniqID;
    this.selectedARDVersionUniqID = event.ARDVersionUniqID;
    console.log('arddata', event);
    this.getARDDetails();
  }

  getARDDetails() {
    console.log('Navigated from ARD...........');
    this.runAnalysisAlgoCatalogService.getARDDataService(this.selectedARDUniqId).subscribe((result) => {
      if (result) {
        this.ardData = result;
        this.selectedARDVersionUniqID = this.ardData.data.ardversionuniqid;
        const combinedARD = { ...this.ardData.data.ard_study_details, ...this.ardData.data.summary };
        Object.entries(combinedARD).forEach(x => {
          const a = this.decFields.filter(y => y.id === x[0]);
          if (a) {
            this.ardDetails.push({ id: x[0], label: a[0]?.name, value: x[1] });
          }
        });
        console.log(this.ardDetails);
      }
    });
  }

  getConfigurationFormValues(data: any) {
    this.configurationFormValues = data;
    console.log("formvalues 344", data)
  }

  openRunAnalysisDetails(event: any) {
    console.log("eeee", event)
    this.algojobuniqid = event.algojobuniqid;
    this.algoAnalysisUniqidOfSelectedRunDetail = event.algoanalysisuniqid;
    this.getRunAnalysisDetails(this.algojobuniqid);
  }


  // on click of arrow in run grid(Last section run)
  getRunAnalysisDetails(algojobuniqid: any) {
    this.runAnalysisAlgoCatalogService.getRunAnalysisDetails(algojobuniqid).subscribe((result) => {
      if (result) {
        this.runAnalysisDetails = result;
        console.log("runAnalysisDetails", this.runAnalysisDetails);
        if (this.runAnalysisDetails) {
          const dialogRef: DialogRef = this.dialogService.open({
            content: RunAnalysisDetailPopUpComponent,
          });
          const instance = dialogRef.content.instance;
          instance.runAnalysisDetails = this.runAnalysisDetails;
          instance.algoAnalysisUniqidOfSelectedRunDetail = this.algoAnalysisUniqidOfSelectedRunDetail;
        }
      }
    });
  }

  viewAnalysis() {
    this.showViewAnalysis = true;
  }

  newAnalysis() {
    // const currentUrl = this.router.url;
    this.router.navigate(['home/run']);
    // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    //   this.router.navigate([currentUrl]);
    // });
  }

  getAlgoDetailsOfSelectedViewAnalysis(id: any) {
    this.algorithmRestService.getAlgorithmVersionDetails(id)
      .subscribe((result: any) => {
        if (result) {
          this.selectedAlgoDetails = result;
        }
      });
  }

  getSelectedViewAnalysisData(data: any) {
    if (data) {
      this.selectedViewAnalysisData = data;
      this.ardData = data;
      this.selectedARDUniqId = data.arduniqid;
      this.algoversionuniqid = data.algoversionuniqid;
      this.selectedARDVersionUniqID = data.ardversionuniqid;
      this.getAlgoDetailsOfSelectedViewAnalysis(this.algoversionuniqid);
      this.getARDDetails();
      this.getAlgoConfigurationDetails(this.algoversionuniqid);
      this.runAnalysis();
    }
  }
}
