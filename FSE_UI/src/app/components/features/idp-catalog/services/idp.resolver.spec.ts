import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { idpResolver } from './idp.resolver';

describe('idpResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => idpResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
