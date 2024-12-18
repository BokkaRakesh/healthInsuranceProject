import { Component, OnInit } from '@angular/core';
import { SortDescriptor } from '@progress/kendo-data-query';
import { PaginationEto } from '../../../../models/pageRequest';
import ActivitiesColumns from '../../../../../../assets/columnDefinition/subjects-activities-column.json';
import { IdpHelperService } from '../../services/idp-helper.service';

@Component({
  selector: 'app-subject-activities-detail',
  templateUrl: './subject-activities-detail.component.html',
  styleUrl: './subject-activities-detail.component.scss'
})
export class SubjectActivitiesDetailComponent implements OnInit {

  gridData: any;
  pagination!: PaginationEto;
  fetchDataInfo = false;
  showGrid = false;
  gridColumns = ActivitiesColumns;

  constructor(private idpHelperService: IdpHelperService) {}

  ngOnInit(): void {
    this.idpHelperService.subjectActivitiesResult.subscribe((result) => {
      this.gridData = this.prepareDataForGrid(result.data['items']);
      this.pagination = result.data['pagination'];
      this.showGrid = true;
    });
  }
  
  getSortedData(sort: SortDescriptor): void {
    console.log('sorting', sort);
  }

  getPaginatedData(pageNumber: number): void {
    console.log('paginate', pageNumber);
  }

  prepareDataForGrid(gridData: any[]) {
    gridData.forEach((activity) => {
      const initials = `${activity.user.split(' ')[0].charAt(0)}${activity.user.split(' ')[1].charAt(0)}`
      activity.user = initials
    });
    return gridData;
  }

}
