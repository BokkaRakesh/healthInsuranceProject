import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DrawerComponent } from '@progress/kendo-angular-layout';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SideBarComponent implements OnInit {
  public expanded = false;
  constructor( private route: Router){}
  studyInstancePath = 'https://ips-gip.apollo.roche.com/ohifv3/viewer?StudyInstanceUIDs=1.2.840.113711.5001712.2.7088.506280598.26.2116281012.13240'
  public items = [
    { text: "Home", icon: 'home', selected: true, path: 'home' },
    { text: "Explore Data", icon: 'explore-data', selected: false, path: 'explore-data' },
    { text: "IDP Catalog", icon: 'sidebar_idp', selected: false, path: 'home/idp-catalog' },
    { text: "Algo Catalog", icon: 'explore-algorithms', selected: false, path: 'home/algoCatalog' },
    { text: "Explore Insights", icon: 'sidebar-insights', selected: false, path: 'home' },
    { separator: true },
    { text: "Platforms & Tools", icon: 'platform-tools', selected: false, path: 'home' },
    { text: "My Assets", icon: 'sidebar-project', selected: false, path: 'home' },
    { text: "My Activities", icon: 'activities', selected: false, path: 'home' },
    { text: "Viewer", icon: 'image_viewer', selected: false, path: this.studyInstancePath }
  ];
  // explore-results
  ngOnInit(): void {
  }

  toggleSideBar(data: boolean, drawer: DrawerComponent): void {
    this.expanded = data;
    drawer.toggle();
  }

  onSelect(event: any) {
    this.items.forEach(item => item.selected = false);
    event.item.selected = true;
    if (event.item.text !== 'Viewer') {
      this.route.navigate([event.item.path]);
      return;
    }
    window.open(event.item.path, '_blank');
  }
}
