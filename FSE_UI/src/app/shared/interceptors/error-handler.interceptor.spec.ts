import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpEvent, HttpRequest, HttpResponse, provideHttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ErrorHandlingInterceptor } from './error-handler.interceptor';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

describe('ErrorHandlingInterceptor', () => {
  let client: HttpClient
  let controller: HttpTestingController;
  const mocToastrService = jasmine.createSpyObj(['error']);
  const mocAuthService = jasmine.createSpyObj('AuthService', ['logout']);
  const mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const mockApproval = { httpStatusCode: 500, appCode: -1, message: '', data: ['approved'] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot({
          timeOut: 10000,
          positionClass: 'toast-bottom-left',
          preventDuplicates: true,
        })
      ],
      providers: [
        // register our interceptor with the testing module
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorHandlingInterceptor,
          multi: true
        },
        { provide: ToastrService, useValue: mocToastrService },
        { provide: Router, useValue: mockRouter },
      ],
    })

    client = TestBed.inject(HttpClient)
    controller = TestBed.inject(HttpTestingController)
  })

  it('should call ToastrService error', () => {
    client.get('/api').subscribe((res) =>
      expect(mocToastrService.error).toHaveBeenCalled()
    );
    const req = controller.expectOne('/api');
    req.flush(mockApproval);
  });

  it('should cover if condition', () => {
    client.get('/api').subscribe((res) =>
      expect(mocToastrService.error).toHaveBeenCalled()
    );
    const req = controller.expectOne('/api');
    req.flush(mockApproval, { headers: { errorMessage: "header test error" } });
  });

})