import { Component } from '@angular/core';
import { SVGIcon, xOutlineIcon } from '@progress/kendo-svg-icons';
import { SummaryInfo } from '../../../../shared/shared-components/summary/summary.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explore-data-search-container',
  templateUrl: './explore-data-search-container.component.html',
  styleUrl: './explore-data-search-container.component.scss'
})
export class ExploreDataSearchContainerComponent {
  
  placeHolder = 'Search criteria... (Example: show me latest studies for lung cancer)';

  recentCreatedIDPs: Array<{ label: string, icon: SVGIcon }> = [
    { label: 'show me studies in oncology that are in phase III or IV', icon: xOutlineIcon }, 
    { label: 'ID253654', icon: xOutlineIcon },
    { label: 'MN3989_Musicale', icon: xOutlineIcon }
  ];

  summaryInfo: SummaryInfo[] =   [{ icon: 'study grey',name: "Datasets", value: '465' },
  { icon: "study-user", name: "Subjects", value: '45k'},
  { icon: "attach-file", name: "Files", value: '180k' },
  { icon: "sessions", name: "Sessions", value: '25K' }];

  constructor(private router: Router){}

  performNlqSearch(searchQuery: string) {
    console.log('searchQuery', searchQuery);
    const queryParams = {
      query: searchQuery
    };
    this.router.navigate(['home/explore-data'], { state: { queryParam: queryParams } });
  }
}
