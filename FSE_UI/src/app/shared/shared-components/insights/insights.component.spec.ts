import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InsightsComponent } from './insights.component';

describe('InsightsComponent', () => {
  let component: InsightsComponent;
  let fixture: ComponentFixture<InsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsightsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show insights list properly', () => {
    // GIVEN
    component.insights = [
        {
          name: 'CAFE-14_ROSA-ALPHA_02_24_2024_1:42',
          status: 'inprogress',
          value: 400,
        },
        {
          name: 'CAFE-14_ROSA-ALPHA_02_24_2024_1:42',
          status: 'complete',
          value: 650,
        }
    ];
    // WHEN
    fixture.detectChanges();
    // THEN
    const indiviualInsighListItems = fixture.debugElement.queryAll(By.css('.insight-list > .insight-item'));
    expect(indiviualInsighListItems.length).toEqual(2);
  });
});
