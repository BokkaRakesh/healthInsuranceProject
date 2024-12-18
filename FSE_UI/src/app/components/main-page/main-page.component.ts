import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../../shared/services/loader/loader.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

  loading$: Observable<boolean>;

  constructor(private loaderService: LoaderService) {
    // Subscribe to the loader state observable
    this.loading$ = this.loaderService.loaderState;
  }
}
