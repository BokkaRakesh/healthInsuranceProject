import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '../../../../../shared/services/breadcrumb.service';
import { SharedService } from '../../../../../shared/services/shared/shared.service';

@Component({
  selector: 'app-ard-detail-catalog',
  templateUrl: './ard-detail-catalog.component.html',
  styleUrl: './ard-detail-catalog.component.scss'
})
export class ArdDetailCatalogComponent {
  constructor(private router: ActivatedRoute, private breadcrumbService: BreadcrumbService, private sharedService: SharedService) {

  }
  ngOnInit() {
    this.router.snapshot.data['breadcrumb'] = this.sharedService.getIDPName();
    this.breadcrumbService.updateBreadCrumb();
  }
}
