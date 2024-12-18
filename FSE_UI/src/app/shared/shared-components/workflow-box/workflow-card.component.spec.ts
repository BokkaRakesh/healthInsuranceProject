import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowCardComponent } from './workflow-card.component';
import { By } from '@angular/platform-browser';

describe('WorkflowCardComponent', () => {
  let component: WorkflowCardComponent;
  let fixture: ComponentFixture<WorkflowCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkflowCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkflowCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit cardSelect event when the card selected', () => {
    // GIVEN
    component.card = {
      name: 'Explore Data',
      icon: 'explore-data-box',
      checked: true,
      selected: true,
      searchComponent: 'ExploreDataSearchComponent'
    };
    const selectCardSpy = spyOn(component, 'selectCard').and.callThrough();
    const cardSelectedSpy = spyOn(component.cardSelected, 'emit');
    const cardElement = fixture.debugElement.query(By.css('.workflow-card')).nativeElement;
    // WHEN
    cardElement.click();
    fixture.detectChanges();
    // THEN
    expect(selectCardSpy).toHaveBeenCalled();
    expect(cardSelectedSpy).toHaveBeenCalled();
  });
});
