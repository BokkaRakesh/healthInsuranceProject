import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SVGIcon, xOutlineIcon } from '@progress/kendo-svg-icons';

@Component({
  selector: 'create-idp-search-container',
  templateUrl: './create-idp-search-container.component.html',
  styleUrl: './create-idp-search-container.component.scss'
})
export class CreateIdpSearchContainerComponent {
  
  placeHolder = 'Describe your dataset requirements… (Example: show me studies for lung cancer)';

  recentCreatedIDPs: Array<{ label: string, icon: SVGIcon }> = [
    { label: 'BQ21005_GOYA', icon: xOutlineIcon }, 
    { label: 'ID253654', icon: xOutlineIcon },
    { label: 'MN3989_Musicale', icon: xOutlineIcon }
  ];

  constructor(private router: Router) {}

  performNlqSearch(searchQuery: string) {
    console.log('searchQuery', searchQuery);
    const queryParams = {
      query: searchQuery
    };
    this.router.navigate(['home/study-catalog'], { state: { queryParam: queryParams } });
  }
}
