import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowCardsContainerComponent } from './workflow-cards-container.component';

describe('WorkflowCardsContainerComponent ', () => {
  let component: WorkflowCardsContainerComponent;
  let fixture: ComponentFixture<WorkflowCardsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkflowCardsContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkflowCardsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
