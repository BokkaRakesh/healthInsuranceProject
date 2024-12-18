import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';
import { IBreadCrumb } from '../shared-components/shared-models/breadcrumb.model';
import { LoggerService } from './logger/logger.service';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  breadcrumbs: Array<IBreadCrumb> = [];
  breadcrumbLatestValue = new BehaviorSubject<any>(null);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loggerService: LoggerService
  ) {
    this.updateBreadCrumb();
    this.sendRouteForCreation();
  }

  updateBreadCrumb(){
    this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
    this.breadcrumbLatestValue.next(this.breadcrumbs);
  }

  sendRouteForCreation() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateBreadCrumb();
      });
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Array<IBreadCrumb> = []
  ): Array<IBreadCrumb> {
    try {
      const children: ActivatedRoute[] = route.children;

      if (children.length === 0) {
        return breadcrumbs;
      }

      for (const child of children) {
        const routeURL: string = child.snapshot.url
          .map((segment) => segment.path)
          .join('/');
        if (routeURL !== '') {
          url += `/${routeURL}`;
        }
        breadcrumbs.push({
          label: child.snapshot.data['breadcrumb'],
          value: child.snapshot.data['breadcrumb'],
          icon: child.snapshot.data['icon'],
          disableBreadcrumb: child.snapshot.data['disableBreadcrumb'],
          url: url,
          enableCustomRoute: child.snapshot.data['enableCustomRoute']
        });
        return this.createBreadcrumbs(child, url, breadcrumbs);
      }
      return breadcrumbs;
    } catch (err) {
      this.loggerService.error('error in parsing the routes', err);
      return [];
    }
  }
}
