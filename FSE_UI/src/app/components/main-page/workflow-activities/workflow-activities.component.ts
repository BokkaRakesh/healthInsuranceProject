import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeRestService } from '../../services/home-rest.service';
@Component({
  selector: 'app-workflow-activities',
  templateUrl: './workflow-activities.component.html',
  styleUrl: './workflow-activities.component.scss'
})
export class WorkflowActivitiesComponent {
  activityData: any = [];
  favoriteData: any = [];
  constructor(private router: Router,private homeService: HomeRestService) {}

  ngOnInit(): void {
    this.homeService.getActivitiesFavoriteDetail().subscribe((result) => {
      this.activityData = result.activities;
      this.favoriteData = result.favorites;
      console.log('Activities Data--',this.activityData);
      console.log('Favorite Data--',this.favoriteData);
    })
  }
}

