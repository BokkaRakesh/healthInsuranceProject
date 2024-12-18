import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIdpSummaryComponent } from './create-idp-summary.component';
import { By } from '@angular/platform-browser';

describe('CreateIdpSummaryComponent', () => {
  let component: CreateIdpSummaryComponent;
  let fixture: ComponentFixture<CreateIdpSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateIdpSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateIdpSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should disable Create IDP button and show "no Selection" text if there are no records selected`, () => {
    // GIVEN
    component.rightPanelGridSelectedRecord = [];

    // WHEN
    fixture.detectChanges();

    // THEN
    const noSelectedRecordElement = fixture.debugElement.query(By.css('div.no-selection')).nativeElement;
    const creatIdpButton = fixture.debugElement.query(By.css('.create-idp-btn')).nativeElement;
  
    expect(creatIdpButton.disabled).toBe(true);
    expect(noSelectedRecordElement.textContent).toBe('No Selection');
  });

  it('should enable Create IDP button and show metaData of selected records', () => {
    // GIVEN
    component.rightPanelGridSelectedRecord = [
      {
        studyName: 'My Study_name 1',
        dataSources: 'GIP, RWD'
      },
      {
        studyName: 'My Study_name 3',
        dataSources: 'GIP'
      }
    ];

    // WHEN
    fixture.detectChanges();

    // THEN
    const creatIdpButton = fixture.debugElement.query(By.css('.create-idp-btn')).nativeElement;
    const dataRecordElements = fixture.debugElement.queryAll(By.css('div.metadata'));
    const firstStudyName = dataRecordElements[0].query(By.css('div.study-name > span')).nativeElement;
    const firstStudyDataSources = dataRecordElements[0].query(By.css('div.study-source > span')).nativeElement;
    const SecondStudyName = dataRecordElements[1].query(By.css('div.study-name > span')).nativeElement;
    const SecondStudyDataSources = dataRecordElements[1].query(By.css('div.study-source > span')).nativeElement;

    expect(creatIdpButton.disabled).toBe(false);
    expect(firstStudyName.textContent).toBe('My Study_name 1');
    expect(firstStudyDataSources.textContent).toBe('GIP, RWD');
    expect(SecondStudyName.textContent).toBe('My Study_name 3');
    expect(SecondStudyDataSources.textContent).toBe('GIP');
  });
});
