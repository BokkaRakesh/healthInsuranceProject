import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpInterceptorFn } from '@angular/common/http';

import { loaderInterceptor } from './loader.interceptor';
import { LoaderService } from '../services/loader/loader.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('loaderInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  const mockTokenService = jasmine.createSpyObj(['get', 'set']);
  const mocktoken = { httpStatusCode: 200, appCode: 1, message: '', data: ['12345'] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: loaderInterceptor,
          multi: true
        },
        { provide: LoaderService, useValue: mockTokenService },
      ],
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(loaderInterceptor).toBeTruthy();
  });
});
