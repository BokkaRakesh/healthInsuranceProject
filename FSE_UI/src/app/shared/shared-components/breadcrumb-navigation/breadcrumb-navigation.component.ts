import { Component, Input } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { IBreadCrumb } from '../shared-models/breadcrumb.model';
import { ACCOUNT_CONSTANTS } from '../../../../constants/app-settings.constant';



@Component({
  selector: 'app-breadcrumb-navigation',
  templateUrl: './breadcrumb-navigation.component.html',
  styleUrl: './breadcrumb-navigation.component.scss',
})
export class BreadcrumbNavigationComponent {
  constructor(
    private breadcrumbService: BreadcrumbService,
    private router: Router, private route: ActivatedRoute
  ) {}
  @Input() showBadgeLabel: String = '';
  // @Input() breadcrumbs: any[] = [];
  idpID: any = "";
  breadcrumbsList: Array<IBreadCrumb> = [];
  breadcrumbs: Array<IBreadCrumb> = [];

  ngOnInit(): void {
    this.idpID = this.route.snapshot.paramMap.get('idpId');
    this.getbreadCrumbValue();
  }

  getbreadCrumbValue(){
    this.breadcrumbService.breadcrumbLatestValue.subscribe((data) => {
      this.breadcrumbs = data;
    });
  }

  public onBreadCrumbClick(item: IBreadCrumb) {
    if(item.enableCustomRoute){
      this.router.navigate(['home/idp-catalog/idp', this.idpID])
    }else{
      this.router.navigate([item.url]);
    }
  }
}
