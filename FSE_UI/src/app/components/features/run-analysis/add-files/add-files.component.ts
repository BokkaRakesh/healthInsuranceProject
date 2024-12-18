import { Component, Input, OnInit } from '@angular/core';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { RunAnalysisAlgoCatalogService } from '../services/run-analysis-algo-catalog.service';
import { LoaderService } from '../../../../shared/services/loader/loader.service';
import addFilesColumns from '../../../../../assets/columnDefinition/run-analysis-add-files-grid-columns.json'
import { GridService } from '../../../../shared/services/grid/grid.service';
@Component({
  selector: 'app-add-files',
  templateUrl: './add-files.component.html',
  styleUrl: './add-files.component.scss'
})
export class AddFilesComponent implements OnInit{
  @Input() selectedfilesdata: any;
  gridData: any;
  pagination : any;
  files: any[] = [];
  checkBoxSelection: boolean= true;
  gridColumns: any =  addFilesColumns;
  rowSelected = false;
  allSelected = false;
  selectedRecords: any;
  constructor(private dialogRef: DialogRef, private loaderService: LoaderService,  private gridService : GridService,private runAnalysisAlgoCatalogService: RunAnalysisAlgoCatalogService){
  } 

  ngOnInit(): void {
    // this.getAddFilesData();
    this.gridService.findDatasubject.subscribe((records: any) => {
      this.selectedRecords = records
    });
  }
  close(): void {
    this.dialogRef.close(this.selectedRecords);
  }

  // uploadFiles(){
  //   console.log('upload file')
  // }
  // getAddFilesData(){
  //   let id, payload;
  //   this.runAnalysisAlgoCatalogService.getAddFilesDataService(id, payload).subscribe((result) => {
  //     console.log("algodata1511", result);
  //     this.gridData = result.data.items;
  //     console.log("algodata1511", this.gridData.length);
  //     this.pagination = result.data['pagination'];
  //     this.loaderService.hideLoader();
  //   });
  // }

  onDataSelection(selectedRecord: any, rowSelected: any) {
    rowSelected = !rowSelected;
    console.log("selected record", selectedRecord)
  };


  onFileDropped($event: any) {
    for (const item of $event) {
      this.files.push(item);
      console.log('onFileDropped:', this.files)
    }
  }

  // onFileChange(pFileList: Event) {
  //   const input = pFileList.target as HTMLInputElement;
  //   if (input?.files) {
  //     this.files = Array.from(input.files);
  //   }
  //   console.log(' this.files:', this.files);
  //   const formData = new FormData();
  //   this.files.forEach((file, index) => {
  //     formData.append(`files[${index}]`, file, file.name);
  //   });
  //   console.log('formData', formData);
  //   // this.http.post('http://localhost:8001/upload', formData).subscribe(res => {
  //   //   console.log(res);
  //   //   alert('Uploaded Successfully.');
  //   // })
  // }

}
