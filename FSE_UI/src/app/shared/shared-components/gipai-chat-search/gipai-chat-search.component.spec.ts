import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GipaiChatSearchComponent } from './gipai-chat-search.component';

describe('GipaiChatSearchComponent', () => {
  let component: GipaiChatSearchComponent;
  let fixture: ComponentFixture<GipaiChatSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GipaiChatSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GipaiChatSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
