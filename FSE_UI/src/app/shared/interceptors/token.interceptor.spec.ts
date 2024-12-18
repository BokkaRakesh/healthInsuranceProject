import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { TokenService } from '../services/token/token.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('TokenInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  const mockTokenService = jasmine.createSpyObj(['get', 'set']);
  const mocktoken = { httpStatusCode: 200, appCode: 1, message: '', data: ['12345'] };

  beforeEach(() => {
    // tslint:disable-next-line
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
        },
        { provide: TokenService, useValue: mockTokenService },
      ],
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController)
  });

  it('should receive token to set Authorization', () => {
    mockTokenService.get.and.returnValue('jqJhbaciOiJI1UzI1N4iIsInR5cCI6IkpXVCJ9');
    http.post("http://localhost:8500/api", { email: 'admin', password: '1234' }).subscribe((res) => (
      expect(mockTokenService.get).toHaveBeenCalled()
    ));
    const req = httpMock.expectOne('http://localhost:8500/api');
    req.flush(mocktoken);
    expect(req.request.headers.has('Authorization')).toEqual(true);
    httpMock.verify();
  });
});

