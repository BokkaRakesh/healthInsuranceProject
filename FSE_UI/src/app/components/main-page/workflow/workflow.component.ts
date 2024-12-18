import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CreateIdpSearchContainerComponent } from '../search-containers/create-idp-search-container/create-idp-search-container.component';
import { ExploreDataSearchContainerComponent } from '../search-containers/explore-data-search-container/explore-data-search-container.component';
import { IdpCatalogSearchContainerComponent } from '../search-containers/idp-catalog-search-container/idp-catalog-search-container.component';

export interface WorkFlowEto {
  name: string;
  icon: string;
  checked: boolean;
  selected: boolean;
}
@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrl: './workflow.component.scss',
})
export class WorkflowComponent implements OnInit {
  @Output() selectedWorkflows = new EventEmitter<any>();
  
  isWorkflowMenuVisible: boolean = false;
  workflows: WorkFlowEto[] = [
    {
      name: 'Explore Data',
      icon: 'explore-data-box',
      checked: true,
      selected: true
    },
    {
      name: 'Create IDP',
      icon: 'create-idp-box',
      checked: true,
      selected: false
    },
    {
      name: 'IDP Catalog',
      icon: 'idp-catalog-box',
      checked: true,
      selected: false
    },
    {
      name: 'Run Analysis',
      icon: 'runAnalysis-catalog-box',
      checked: true,
      selected: false
    },
    {
      name: 'Algo Catalog',
      icon: 'algo-catalog-box',
      checked: true,
      selected: false
    },
    {
      name: 'Algorithm Development',
      icon: 'algoDevelopment-catalog-box',
      checked: true,
      selected: false
    },
    {
      name: 'UBER',
      icon: 'uber-catalog-box',
      checked: true,
      selected: false
    },
    {
      name: 'Explore Insights',
      icon: 'explore-insights-box',
      checked: true,
      selected: false
    },
    {
      name: 'Data Annotation',
      icon: 'data-annotation-box',
      checked: true,
      selected: false
    },
    {
      name: 'Data Viewing',
      icon: 'data-viewing-box',
      checked: false,
      selected: false
    },
    {
      name: 'Request Access',
      icon: 'explore-data-box',
      checked: true,
      selected: true
    }
  ];

  ngOnInit(): void {
    this.selectedWorkflows.emit(this.workflows.filter(workflow => workflow.checked));
  }

  openWorkflow() {
    this.isWorkflowMenuVisible = !this.isWorkflowMenuVisible;
  }

  // applySelection() {
  //   this.selectedWorkflows.emit(this.workflows.filter(workflow => workflow.checked));
  //   this.isWorkflowMenuVisible = !this.isWorkflowMenuVisible;
  // }

  isAnyWorkflowSelected(): boolean {
    return this.workflows.some(workflow => workflow.checked);
  }


  applySelection() {
    const selectedWorkflows = this.workflows.filter(workflow => workflow.checked);
    if (selectedWorkflows.length > 0) {
      this.selectedWorkflows.emit(selectedWorkflows);
      this.isWorkflowMenuVisible = !this.isWorkflowMenuVisible;
    } else {
      console.log("Please select at least one workflow.");
    }
  }

 
}
