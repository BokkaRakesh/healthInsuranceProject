import { Component } from '@angular/core';
import { SVGIcon, xOutlineIcon } from '@progress/kendo-svg-icons';
import { SummaryInfo } from '../../../../shared/shared-components/summary/summary.component';
import { Router } from '@angular/router';

@Component({
  selector: 'idp-catalog-search-container',
  templateUrl: './idp-catalog-search-container.component.html',
  styleUrl: './idp-catalog-search-container.component.scss'
})
export class IdpCatalogSearchContainerComponent {

  placeHolder = 'Search criteria... (Example: show me latest studies for lung cancer)';

  recentCreatedIDPs: Array<{ label: string, icon: SVGIcon }> = [
    { label: 'IPSOS-Oncology Monitor', icon: xOutlineIcon }, 
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
    this.router.navigate(['home/idp-catalog'], { state: { queryParam: queryParams } });
  }
 

}
