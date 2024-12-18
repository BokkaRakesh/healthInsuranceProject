import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GipaiComponent } from './gipai.component';

describe('GipaiComponent', () => {
  let component: GipaiComponent;
  let fixture: ComponentFixture<GipaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GipaiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GipaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
