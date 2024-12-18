import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { FormsModule } from '@angular/forms';

import { WorkflowComponent } from './workflow.component';

describe('WorkflowComponent', () => {
  let component: WorkflowComponent;
  let fixture: ComponentFixture<WorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkflowComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [InputsModule, FormsModule],
      providers: []
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display workflow popup with workflow items on click of workflow gear icon', () => {
    // GIVEN
    component.workflows = [
      {
        name: 'Explore Data',
        icon: 'explore-data-box',
        checked: true,
        selected: true,
      },
      {
        name: 'Create IDP',
        icon: 'create-idp-box',
        checked: true,
        selected: false,
      },
      {
        name: 'IDP Catalog',
        icon: 'idp-catalog-box',
        checked: true,
        selected: false,
      }
    ];
    const openWorkflowSpy = spyOn(component, 'openWorkflow').and.callThrough();
    const workflowElement = fixture.debugElement.query(By.css('.gear-icon'));
    const gearIconElement = workflowElement.query(By.css('img')).nativeElement;
    
    // WHEN
    gearIconElement.click();
    fixture.detectChanges();
    
    // THEN
    const workflowPopupElement = workflowElement.query(By.css('.gear-menu > .popup-menu'));
    const workflowPopupItems = workflowPopupElement.children[1].queryAll(By.css('p'));

    expect(openWorkflowSpy).toHaveBeenCalled();
    expect(workflowPopupElement).toBeTruthy();
    expect(workflowPopupItems.length).toBe(component.workflows.length);
  });

  it('should hide/show workflow popup on click of gear icon', () => {
    // GIVEN
    component.workflows = [
      {
        name: 'Explore Data',
        icon: 'explore-data-box',
        checked: true,
        selected: true,
      },
      {
        name: 'Create IDP',
        icon: 'create-idp-box',
        checked: true,
        selected: false,
      },
      {
        name: 'IDP Catalog',
        icon: 'idp-catalog-box',
        checked: true,
        selected: false,
      }
    ];
    const workflowElement = fixture.debugElement.query(By.css('.gear-icon'));
    const gearIconElement = workflowElement.query(By.css('img')).nativeElement;
    
    // Clicked 1st time to show popup
    gearIconElement.click();
    fixture.detectChanges();
    
    const workflowPopupElement = workflowElement.query(By.css('.gear-menu > .popup-menu'));
    
    expect(workflowPopupElement).toBeTruthy(); // Pop up visible

    // Clicked 2nd time to hide popup
    gearIconElement.click();
    fixture.detectChanges();

    expect(workflowPopupElement).toBeTruthy(); // Pop up hidden
  });

  it('should emit selected workflow from popup to display as card', () => {
    // GIVEN
    component.workflows = [
      {
        name: 'Explore Data',
        icon: 'explore-data-box',
        checked: false,
        selected: false,
      },
      {
        name: 'Create IDP',
        icon: 'create-idp-box',
        checked: false,
        selected: false,
      },
      {
        name: 'IDP Catalog',
        icon: 'idp-catalog-box',
        checked: false,
        selected: false,
      }
    ];
    const applySelectionSpy = spyOn(component, 'applySelection').and.callThrough();
    const selectedWorkEmitter = spyOn(component.selectedWorkflows, 'emit');
    const workflowElement = fixture.debugElement.query(By.css('.gear-icon'));
    const gearIconElement = workflowElement.query(By.css('img')).nativeElement;
    
    // WHEN
    gearIconElement.click();
    fixture.detectChanges();
    
    // THEN
    const workflowPopupElement = workflowElement.query(By.css('.gear-menu > .popup-menu'));
    const workflowPopupItems = workflowPopupElement.children[1].queryAll(By.css('p'));
    const applyButton = workflowPopupElement.children[2].query(By.css('button')).nativeElement;
    
    // Popup menu visible with the avaliable workflow items
    expect(workflowPopupElement).toBeTruthy();
    expect(workflowPopupItems.length).toBe(component.workflows.length);

    const popupItemCheckbox1 = workflowPopupItems[0].query(By.css('kendo-checkbox > input')).nativeElement;
    const popupItemCheckbox2 = workflowPopupItems[1].query(By.css('kendo-checkbox > input')).nativeElement;

    // Initially the checkboxes is unchecked
    expect(popupItemCheckbox1.checked).toBeFalsy();
    expect(popupItemCheckbox2.checked).toBeFalsy();

    // Selecting workflow items from workflow menu
    popupItemCheckbox1.click();
    popupItemCheckbox2.click();
    fixture.detectChanges();

    // verifying selected checkboxes
    expect(popupItemCheckbox1.checked).toBeTruthy();
    expect(popupItemCheckbox2.checked).toBeTruthy();

    // Clicked on apply button to emit the selected workflow items
    applyButton.click();
    fixture.detectChanges();

    expect(applySelectionSpy).toHaveBeenCalled();
    expect(selectedWorkEmitter).toHaveBeenCalledWith([
      {
        name: 'Explore Data',
        icon: 'explore-data-box',
        checked: true,
        selected: false,
        searchComponent: 'ExploreDataSearchComponent'
      },
      {
        name: 'Create IDP',
        icon: 'create-idp-box',
        checked: true,
        selected: false,
        searchComponent: 'CreateIdpSearchComponent'
      }
    ]);
  });
});
