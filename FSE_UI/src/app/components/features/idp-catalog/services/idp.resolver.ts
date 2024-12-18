import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { IdpRestService } from '../../../services/idp-rest.service';

export const idpResolver: ResolveFn<any> = (route, state): Observable<any> => {
  const idpId = route.paramMap.get('idpId') as string;
  const idpRestService = inject(IdpRestService);
  return idpRestService.getIdp(idpId, 1);
};
