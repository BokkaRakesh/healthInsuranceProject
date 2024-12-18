import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { WorkFlowEto } from '../workflow/workflow.component';
import { Router } from '@angular/router';
import { ACCOUNT_CONSTANTS } from '../../../../constants/app-settings.constant';
import {
  DialogCloseResult,
  DialogRef,
  DialogService,
} from '@progress/kendo-angular-dialog';
import { AlgoDevelopmentDialogComponent } from '../../features/algorithm-development/components/algo-development-dialog/algo-development-dialog.component';
import { UberDialogComponent } from '../../features/uber/uber-dialog/uber-dialog.component';
@Component({
  selector: 'app-workflow-cards-container',
  templateUrl: './workflow-cards-container.component.html',
  styleUrl: './workflow-cards-container.component.scss'
})
export class WorkflowCardsContainerComponent implements OnChanges, OnInit {

  @Input() selectedWorkflowCards: WorkFlowEto[] = [];
  selectedCard: any;
  scrollLeft = 0;
  cardWidth = 175; // Width of each card (includes margin/padding)
  visibleCardsCount = 7; // Define how many cards to show
  canScrollLeft = false;
  canScrollRight = false;
  activeIndex = 0;
  constructor(private router: Router,
    private dialogService: DialogService) {}

  ngOnChanges() {
    this.checkScrollAvailability();
  }

  ngOnInit(): void {
  }

  // TODO: Scrolling of cards
  checkScrollAvailability() {
    const totalCardsWidth = this.selectedWorkflowCards.length * this.cardWidth;
    const containerWidth = this.visibleCardsCount * this.cardWidth;

    this.canScrollLeft = this.scrollLeft < 0;
    this.canScrollRight = totalCardsWidth > containerWidth - this.scrollLeft;
  }

  // TODO: Scrolling of cards
  nextCard() {
    if (this.canScrollRight) {
      this.scrollLeft -= this.cardWidth; // Scroll to the next card
      this.checkScrollAvailability();
    }
  }

  // TODO: Scrolling of cards
  prevCard() {
    if (this.canScrollLeft) {
      this.scrollLeft += this.cardWidth; // Scroll to the previous card
      this.checkScrollAvailability();
    }
  }

  highlightSelectedCard(selectedCard: any) {
    this.selectedWorkflowCards.forEach(card => {
      if (card === selectedCard) {
        if(card.name === 'Data Annotation') {
          window.open(ACCOUNT_CONSTANTS.UBER_DATA_ANNOTATION, '_blank');
          console.log('url is', window.location.href);
        }
        else if(card.name === 'Explore Data'){

          this.router.navigate(['home/explore-data']);
        }
        else if(card.name === 'Create IDP'){

          this.router.navigate(['/home/study-catalog']);
        }
        else if(card.name === 'IDP Catalog'){

          this.router.navigate(['/home/idp-catalog']);
        }
        else if(card.name === 'Run Analysis'){

        }
        else if(card.name === 'Algo Catalog'){

        }
        else if(card.name === 'Algorithm Development'){
          const dialogRef: DialogRef = this.dialogService.open({
            content: AlgoDevelopmentDialogComponent,
          });
        }
        else if(card.name === 'Explore Insights'){

        }
        else if(card.name === 'UBER'){
          const dialogRef: DialogRef = this.dialogService.open({
            content: UberDialogComponent,
          });
        }
        else if(card.name === 'Data Viewing'){
     
        }
        else if(card.name === 'Data Annotation'){
     
        }
        else if(card.name === 'Request Access'){

          this.router.navigate(['home/request-access']);
        }
      } else {
        card.selected = false;
      }
    });
  }

}
