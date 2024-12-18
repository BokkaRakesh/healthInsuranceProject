import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AccessControlComponent } from './access-control.component';

describe('AccessControlComponent', () => {
  let component: AccessControlComponent;
  let fixture: ComponentFixture<AccessControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccessControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show users list properly', () => {
    // GIVEN
    component.users = [
      {
        initials: 'AZ',
        name: 'Alyson Zorko',
        permission: 'read-write',
      },
      {
        initials: 'VF',
        name: 'Valery Freeman',
        permission: 'read-only',
      }
    ];
    // WHEN
    fixture.detectChanges();
    // THEN
    const indiviualAccessControlItem = fixture.debugElement.queryAll(By.css('.access-control-list > .access-control-item'));
    expect(indiviualAccessControlItem.length).toEqual(2);
  });
});
