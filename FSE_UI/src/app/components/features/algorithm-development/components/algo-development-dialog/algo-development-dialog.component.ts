import { Component } from '@angular/core';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { ExploreDataService } from '../../../data-explorer/services/explore-data.service';
import { AlgoDevFlowEto } from '../../../../models/pageRequest';
@Component({
  selector: 'app-algo-development-dialog',
  templateUrl: './algo-development-dialog.component.html',
  styleUrl: './algo-development-dialog.component.scss'
})
export class AlgoDevelopmentDialogComponent {

  ardName: any;
  expDocDetails: any[] = [];
  exploreId:any;
  ardDetailResult:any ;

  workflows: AlgoDevFlowEto[] = [
    {
      name: 'HPC',
      icon: 'algoDevelopment-catalog-box',
      checked: true,
      selected: true
    },
    {
      name: 'Poratble Analytics',
      icon: 'algoDevelopment-catalog-box',
      checked: true,
      selected: false
    },
    {
      name: 'Sagemaker',
      icon: 'algoDevelopment-catalog-box',
      checked: true,
      selected: false
    },
    {
      name: 'Vertex',
      icon: 'algoDevelopment-catalog-box',
      checked: true,
      selected: false
    }
  ];
  constructor(private dialogRef: DialogRef, private exploreDataService: ExploreDataService, ) {
  
  }
  ngOnInit(): void {
    console.log('Id--', this.exploreId);
  }
  close(): void {
    this.dialogRef.close();
  }


}
