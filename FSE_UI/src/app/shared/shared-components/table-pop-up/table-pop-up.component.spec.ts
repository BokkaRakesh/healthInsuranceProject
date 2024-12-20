import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePopUpComponent } from './table-pop-up.component';

describe('TablePopUpComponent', () => {
  let component: TablePopUpComponent;
  let fixture: ComponentFixture<TablePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablePopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
