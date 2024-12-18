import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loaderSubject = new BehaviorSubject<boolean>(false);
  public loaderState = this.loaderSubject.asObservable();

  constructor() { }

  showLoader(): void {
    console.log('loader visible');
    this.loaderSubject.next(true);  // Show loader
  }

  hideLoader(): void {
    console.log('loader hide');
    this.loaderSubject.next(false);  // Hide loader
  }
}
