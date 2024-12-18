import { TestBed } from '@angular/core/testing';

import { GlobalErrorHandlerService } from './global-error-handler.service';

describe('GlobalErrorHandlerService', () => {
  let service: GlobalErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalErrorHandlerService);
  });

  it('should log message when type is Error', () => {
    const error = new Error("Test error handler");
    const spy = spyOn(console, 'error');
    service.handleError(error);
    expect(spy).toHaveBeenCalledWith("Global error occured", error);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
