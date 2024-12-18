import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExploreDocDialogComponent } from '../../data-explorer/explore-doc-dialog/explore-doc-dialog.component';

// import { ExploreDocDialogComponent } from './explore-doc-dialog.component';

describe('ExploreDocDialogComponent', () => {
  let component: ExploreDocDialogComponent;
  let fixture: ComponentFixture<ExploreDocDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreDocDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExploreDocDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
