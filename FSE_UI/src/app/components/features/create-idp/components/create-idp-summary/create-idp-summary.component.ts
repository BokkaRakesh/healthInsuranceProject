import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { GridService } from '../../../../../shared/services/grid/grid.service';
import { Router } from '@angular/router';
import { DialogCloseResult, DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { CreateIdpDialogComponent } from '../create-idp-dialog/create-idp-dialog.component';
import { IdpRestService } from '../../../../services/idp-rest.service';
import { CreateIdpRequestEto } from '../../../../models/IdpEto';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../../../../shared/services/loader/loader.service';

@Component({
  selector: 'app-create-idp-summary',
  templateUrl: './create-idp-summary.component.html',
  styleUrl: './create-idp-summary.component.scss'
})
export class CreateIdpSummaryComponent implements OnInit {
  // @ViewChild(ToastContainerDirective, { static: true })
  rightPanelGridSelectedRecord: any[] = [];
  createIdpNames: any[] = [];
  dataSources: any[] = [];
  dataSourceList: any[] = [];
  names: any;
  seperatedDataSources: any;
  idpName: any;
  prefix: string = 'IDP';

  constructor(
    private gridService : GridService,
    private router: Router,
    private dialogService: DialogService,
    private idpRestService: IdpRestService,
    private toastrService: ToastrService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.getGridSelectionData();
   this.getDataSourcesSelectionData();
  }

  getGridSelectionData() {
    this.gridService.findDatasubject.subscribe(records => {
      this.rightPanelGridSelectedRecord = records;
      const transformDataSources = records.map((study: any) => {
        const filteredIds = study.DataSources
          .filter((source: any) => source.access)
          .map((source: any) => source.id)
          .join(',')
        return {
          ...study,
          DataSources: filteredIds
        };
      });
      this.rightPanelGridSelectedRecord = transformDataSources.filter((item: any) => item.DataSources.length > 0);
    })
  }

  getDataSourcesSelectionData() {
    this.gridService.sendDataSourceInfo.subscribe((item: any) => {
      const transformDataSources = this.checkboxSelectedDataSource(this.rightPanelGridSelectedRecord, item);
      this.rightPanelGridSelectedRecord = transformDataSources.filter((item: any) => item.DataSources.length > 0);
      this.gridService.deSelectGridRow.next(this.rightPanelGridSelectedRecord);
    })
  }

  checkboxSelectedDataSource(studyRecords: any[], accessRecords: any[]): any[] {
    return studyRecords.map(study => {
      let dataSources = study.DataSources.split(',').map((ds: any) => ds.trim()).filter((ds: any) => ds !== '');
      accessRecords.forEach(access => {
        if (access.StudyID === study.StudyID) {
          if (access.access === false) {
            dataSources = dataSources.filter((ds: any) => ds !== access.id);
          } else if (access.access === true) {
            if (!dataSources.includes(access.id)) {
              dataSources.push(access.id);
            }
          }
        }
      });
      const updatedDataSources = dataSources.length > 0 && dataSources !== "" ? dataSources.join(', ') : '';
      return {
        ...study,
        DataSources: updatedDataSources
      };
    });
  }

  openCreateIdpDialog() {
    const dialogRef: DialogRef = this.dialogService.open({
      content: CreateIdpDialogComponent
    });
     // Pass data to the dialog content
     this.createIdpNames = [];
     this.dataSources = [];
     const dialogInstance = dialogRef.content.instance as CreateIdpDialogComponent;
     this.rightPanelGridSelectedRecord.forEach((selectedRecord:any) => {
      if (selectedRecord?.StudyNumber && !this.createIdpNames.includes(selectedRecord.StudyNumber)
      ){
        this.createIdpNames.push(selectedRecord?.StudyNumber);  
   
        if(selectedRecord?.DataSources  && !this.dataSources.includes(selectedRecord.DataSources))
           {
            // Process the array
            this.dataSourceList.push(selectedRecord?.DataSources);
            let newArray = Array.from(
              new Set(
                this.dataSourceList.flatMap(item => item.split(',')) 
              )
            );

          // Convert the array to a string
          this.seperatedDataSources = newArray.join('-');   
        }
        this.names = `${this.createIdpNames.join('-')}`;
      } 
     })
    dialogInstance.idpName =  this.names;
    dialogRef.result.subscribe((res) => {
      if (!(res instanceof DialogCloseResult)) {
        this.callCreateIDP(res);
      }
    });
  }

  callCreateIDP(IdpDetail: any) {
    this.dataSources.push(this.seperatedDataSources);
    this.idpName = `${this.prefix}_${IdpDetail?.name}_${this.dataSources}`;
    console.log('IDP Name=============', this.idpName);
    this.loaderService.showLoader();
    const payload = {
      studies:  this.rightPanelGridSelectedRecord.map((study) => {
        return {
          StudyID: study.StudyID,
          StudyNumber: study.StudyNumber,
          DataSources : study.DataSources.split(",")
        }
      }),
      name: this.idpName,
      updatable: IdpDetail?.updatable,
    } as CreateIdpRequestEto;
    console.log('payload is ', payload);
    this.idpRestService.createIdp(payload).subscribe((response) => {
      this.loaderService.hideLoader();
      console.log('IDP initiated successfully - ', response);
      if(response.status === 'success'){
       this.toastrService.success(response.message);
        console.log(response.message);
      }
      this.router.navigate(['home/idp-catalog/idp/', response.IDP_Unq_ID]);
      console.log('Routing to New Page....');
    }, (error) => {
      this.loaderService.hideLoader();
      console.error('IDP creation failed - ', error);
      console.error('error.error', error.error);
      // if(error.statusText === 'OK' && (error.error.text).toLowerCase().includes('duplicate')){
      //   this.toastrService.error('Oops!! Selected Records already have been Created. Please try with other records.');
      // }
      if(error.error.error.includes('duplicate unique key')){
        this.toastrService.error('Entered IDP Name is already Exists!! Please try with different name');
      }
    });
  }
}
