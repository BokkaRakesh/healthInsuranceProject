import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

interface NavigationTab {
  label: string;
  path?: string[];
  isSelected: boolean;
}

@Component({
  selector: 'app-tab-navigation',
  templateUrl: './tab-navigation.component.html',
  styleUrl: './tab-navigation.component.scss',
})
export class TabNavigationComponent {
  @Input() navigation: any[] = [];
  @Input() statusInfo!: any;
  @Output() tabInfo = new EventEmitter();
  statusDisplay: any;

  statusMapper = [
    { name: 'in_progress', label: 'In Progress' },
    { name: 'active', label: 'Ready to use' },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    //this.statusMapper.filter((x) => {if (x.name === this.statusInfo) { this.statusDisplay = x;}});  
  }

  ngOnChanges(change: SimpleChanges){
    if(change?.['statusInfo']?.currentValue){
      this.statusMapper.filter((x) => {if (x.name === this.statusInfo) { this.statusDisplay = x;}});
    }
  }

  selectTab(tab: NavigationTab) {
    // this.router.navigate(['ui/exploreData'])
    this.navigation.forEach((tabs) => (tabs.isSelected = false));
    tab.isSelected = true;
    this.tabInfo.emit(tab);
  }
}
