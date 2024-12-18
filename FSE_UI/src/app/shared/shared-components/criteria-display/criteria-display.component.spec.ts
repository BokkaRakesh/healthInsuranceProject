import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CriteriaDisplayComponent } from './criteria-display.component';

describe('CriteriaDisplayComponent', () => {
  let component: CriteriaDisplayComponent;
  let fixture: ComponentFixture<CriteriaDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CriteriaDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriteriaDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show inclusion and exclusion criteria list properly', () => {
    // GIVEN
    component.inclusionCriteria = [
      {
        label: 'Country',
        value: 'USA',
      }
    ];

    component.exclusionCriteria = [
      {
        label: 'Images',
        value: 'JPG',
      },
    ];
    // WHEN
    fixture.detectChanges();
    // THEN
    const criteriaSections = fixture.debugElement.queryAll(By.css('.criteria-grid > .criteria-section'));
    const inclusionCriteriaSection = criteriaSections[0].query(By.css('.criteria-item'));
    const exclusionCriteriaSection = criteriaSections[1].query(By.css('.criteria-item'));
    expect(inclusionCriteriaSection.query(By.css('.criteria-label')).nativeElement.textContent).toBe('Country');
    expect(inclusionCriteriaSection.query(By.css('.criteria-value')).nativeElement.textContent).toBe('USA');
    expect(exclusionCriteriaSection.query(By.css('.criteria-label')).nativeElement.textContent).toBe('Images');
    expect(exclusionCriteriaSection.query(By.css('.criteria-value')).nativeElement.textContent).toBe('JPG');
  });

  it('should show "No Criteria Applied" if no inclusion and exclusion criteria is found', () => {
    // GIVEN
    component.inclusionCriteria = [];
    component.exclusionCriteria = [];
    // WHEN
    fixture.detectChanges();
    // THEN
    const criteriaSections = fixture.debugElement.queryAll(By.css('.criteria-grid > .criteria-section'));
    const inclusionCriteriaSection = criteriaSections[0].query(By.css('.no-criteria')).nativeElement;
    const exclusionCriteriaSection = criteriaSections[1].query(By.css('.no-criteria')).nativeElement;
    expect(inclusionCriteriaSection.textContent).toBe('No Criteria Applied');
    expect(exclusionCriteriaSection.textContent).toBe('No Criteria Applied');
  });
});
