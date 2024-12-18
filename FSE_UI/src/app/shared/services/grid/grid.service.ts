import { Injectable } from '@angular/core';
import gridColumnInfo from '../../../../assets/columnDefinition/column-title.json';
import { Subject, of } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ACCOUNT_CONSTANTS } from '../../../../constants/app-settings.constant';
import gridData from '../../../../assets/mockData/idp.json';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  public idpUrl = ACCOUNT_CONSTANTS.userUrl + '/assets/idp.json';
  
  findDatasubject = new Subject<any>();
  sendDataSourceInfo = new Subject<any>();
  deSelectGridRow =  new Subject<any>();

  constructor(private httpClient: HttpClient) { }

  getColumnTitleInfo() {
    return of(gridColumnInfo);
  };

  getIDPDataInfo() {
   return of(gridData);
   //return this.httpClient.get('http://localhost:4200/assets/mockData/idp.json');
  }

}
