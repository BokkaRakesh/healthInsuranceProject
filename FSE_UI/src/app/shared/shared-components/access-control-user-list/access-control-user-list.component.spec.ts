import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessControlUserListComponent } from './access-control-user-list.component';
import { By } from '@angular/platform-browser';

describe('AccessControlUserListComponent', () => {
  let component: AccessControlUserListComponent;
  let fixture: ComponentFixture<AccessControlUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccessControlUserListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessControlUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show users list properly', () => {
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
    fixture.detectChanges();
    const indiviualAccessControlItem = fixture.debugElement.queryAll(By.css('.access-control-list > .access-control-item'));
    expect(indiviualAccessControlItem.length).toEqual(2);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
