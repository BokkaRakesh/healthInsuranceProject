import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;
  let access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiTmF2ZWVuIiwibGFzdF9uYW1lIjoiZ2hpbGRpeW5AZ2VuZS5jb20iLCJkaXNwbGF5X25hbWUiOiJnaGlsZGl5biIsImVtYWlsIjoiZ2hpbGRpeW5AbmFsYS5yb2NoZS5jb20ifQ.0N3GzfLptmHMzq3jMYFnd_KxOY8hm_E6TE4DXDbO5PY";
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check removeSSOLoginFlag', () => {
    service.remove(`${access_token}`);
    expect(localStorage.removeItem('access_token')).toBeUndefined();
  });

  
  it('check for get token', () => {
    service.get("access_token")
    expect(service).toBeTruthy();
  });

  it('chec for set token', () => {
    service.set(`${access_token}`);
    expect(localStorage.getItem('access_token')).toBeDefined();
  });

});
