import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GipaiChatComponent } from './gipai-chat.component';

describe('GipaiChatComponent', () => {
  let component: GipaiChatComponent;
  let fixture: ComponentFixture<GipaiChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GipaiChatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GipaiChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
