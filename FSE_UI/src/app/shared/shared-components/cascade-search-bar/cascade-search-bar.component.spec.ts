import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CascadeSearchBarComponent } from './cascade-search-bar.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonModule } from '@progress/kendo-angular-buttons';

describe('CascadeSearchBarComponent', () => {
  let component: CascadeSearchBarComponent;
  let fixture: ComponentFixture<CascadeSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CascadeSearchBarComponent],
      imports: [InputsModule, ButtonModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CascadeSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call performSearch when user clicks on the search button', () => {
    // GIVEN
    const kendoTextBoxElement = fixture.debugElement.query(By.css('kendo-textbox'));
    const inputElement = kendoTextBoxElement.query(By.css('input[type]')).nativeElement;
    inputElement.value = 'search query';
    const performSearchSpy = spyOn(component, 'performSearch').and.callThrough();
    // WHEN
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const searchButton = kendoTextBoxElement.query(By.css('.k-input-suffix > .search-btn')).nativeElement;
    searchButton.click();
    fixture.detectChanges();
    // THEN
    expect(performSearchSpy).toHaveBeenCalled();
  });

  it('should clear the user input when user clicks on clear button', () => {
    // GIVEN
    const kendoTextBoxElement = fixture.debugElement.query(By.css('kendo-textbox'));
    const inputElement = kendoTextBoxElement.query(By.css('input[type]')).nativeElement;
    inputElement.value = 'search query';
    const clearSearchSpy = spyOn(component, 'clearSearch').and.callThrough();
    // WHEN
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const clearButton = kendoTextBoxElement.query(By.css('.k-input-suffix > .clear-btn')).nativeElement;
    clearButton.click();
    fixture.detectChanges();
    // THEN
    expect(clearSearchSpy).toHaveBeenCalled();
    expect(inputElement.value).toBe('');
  });

  it('should call focus event when input box is focused and blur event when input box is not focused', () => {
    // GIVEN
    const kendoTextBoxElement = fixture.debugElement.query(By.css('kendo-textbox'));
    const inputElement = kendoTextBoxElement.query(By.css('input[type]')).nativeElement;
    const onFocusSpy = spyOn(component, 'onFocus').and.callThrough();
    const onBlurSpy = spyOn(component, 'onBlur').and.callThrough();
    // WHEN + THEN
    inputElement.focus();
    fixture.detectChanges();
    expect(onFocusSpy).toHaveBeenCalled();

    inputElement.blur();
    fixture.detectChanges();
    expect(onBlurSpy).toHaveBeenCalled();
  });
});
