import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//  import { ARD_URLS, RUN_ALGO_URLS } from '../../../../../constants/app-mock-settings.constant';
import { ARD_URLS, RUN_ALGO_URLS } from '../../../../../constants/app-settings.constant';
import RunAnalysisAlgoCatalogColumns from '../../../../../assets/columnDefinition/run-analysis-algo-catalog-columns.json';
import RunAnalysisARDCatalogColumns from '../../../../../assets/columnDefinition/run-analysis-ard-catalog-columns.json';
import RunAnalysisConfigurationMapper from '../../../../../assets/columnDefinition/run-analysis-configuration-mapper.json';
import RunAnalysisResultFilterMapper from '../../../../../assets/columnDefinition/run-analysis-result-filter-mapper.json';
import * as ViewRunAnalysis from '../../../../../assets/mockData/view-run-analysis.json';

@Injectable({
  providedIn: 'root'
})
export class RunAnalysisAlgoCatalogService {

  constructor(private http: HttpClient) { }

  // getAlgoCatalogDataService(idpId: any,ardPayload:any): Observable<any> {
  //   return this.http.post(`${ARD_URLS.GET_ARDS_List_URL}/${idpId}/catalog`, ardPayload);
  //   // return this.http.get(`${RUN_ALGO_URLS.GET_ALGO_URL}`);  // Remove this mock url
  // }

  getAddFilesDataService(idpId: any,ardPayload:any): Observable<any> {
    return this.http.post(`${ARD_URLS.GET_ARDS_List_URL}/${idpId}/catalog`, ardPayload);
    // return this.http.get(`${RUN_ALGO_URLS.GET_ADD_FILES_GRID_URL}`);  // Remove this mock url
  }

 

  getresultFiltersDataService(): any{
    return RunAnalysisResultFilterMapper;
  }


  getARDDataService(id:any): Observable<any>{
    return this.http.get(`${ARD_URLS.GET_ARD_DETAIL_URL}/${id}`); 
    // return this.http.get(`${ARD_URLS.GET_ARD_DETAIL_URL}`); // Remove this mock url
  }
  getARDCatalogDataService(idpId: any,ardPayload:any): Observable<any> {
    return this.http.post(`${ARD_URLS.GET_ARDS_List_URL}/${idpId}/catalog`, ardPayload);
    // return this.http.get(`${RUN_ALGO_URLS.GET_ARD_URL}`);  // Remove this mock url
  }

  getARDDescCatalogDataService(idpId: any, ardPayload: any): Observable<any> {
    if(idpId){
      return this.http.post(`${ARD_URLS.GET_ARDS_List_URL}/catalog/${idpId}`, ardPayload);
    }else{
      return this.http.post(`${ARD_URLS.GET_ARDS_List_URL}/catalog/null`, ardPayload);
    }
    // return this.http.get(`${RUN_ALGO_URLS.GET_ARD_DESC_URL}`);  // Remove this mock url
  }

  getCatalogDataService(selectedCatalog: string, idpId: any): Observable<any>{
    console.log("selectedCatalog50",selectedCatalog);
    let URL ='';
    if(selectedCatalog === 'Algo'){
      // URL = `${RUN_ALGO_URLS.GET_ALGO_URL}`
    }else{
      if(idpId){
        URL = `${RUN_ALGO_URLS.GET_ARD_URL}/${idpId}`
      }else{
        URL = `${RUN_ALGO_URLS.GET_ARD_URL}/null`
      }
    }
    // const URL = selectedCatalog === 'Algo' ? `${RUN_ALGO_URLS.GET_ALGO_URL}` : `${RUN_ALGO_URLS.GET_ARD_URL}/${idpId}/catalog`; // remove this mock url
    // const URL = selectedCatalog === 'Algo' ? `${RUN_ALGO_URLS.GET_ALGO_URL}` : `${RUN_ALGO_URLS.GET_ARD_URL}/${idpId}/catalog`
    return this.http.get(URL);
  }

  getCatalogColumnsService(selectedCatalog: string): any{
    console.log("selectedCatalog",selectedCatalog);
    return selectedCatalog === 'Algo' ? RunAnalysisAlgoCatalogColumns : RunAnalysisARDCatalogColumns;
  }

  getAlgoConfigurationDataService(algoVersionUniqId: any): Observable<any> {
    let payload = {}
    return this.http.post(`${RUN_ALGO_URLS.GET_ALGO_CONFIG_URL}/${algoVersionUniqId}/config`,payload);
    // return this.http.get(`${RUN_ALGO_URLS.GET_ALGO_CONFIG_URL}`);  // Remove this mock url
  }

  runAnalysisStatusCountService(id: any): Observable<any>{
    // return this.http.get(`${RUN_ALGO_URLS.RUN_ANALYSIS_STATUS_COUNT_URL}`);  // Remove this mock url
    return this.http.get(`${RUN_ALGO_URLS.RUN_ANALYSIS_STATUS_COUNT_URL}/${id}/status_count`);
  }
// right tab run section 
  getRunAnalysisListService(id: any,payload: any): Observable<any>{
    // return this.http.get(`${RUN_ALGO_URLS.GET_RUN_ANALYSIS_List_URL}`)
    return this.http.post(`${RUN_ALGO_URLS.GET_RUN_ANALYSIS_List_URL}/${id}/run_list`,payload);
  }

  // On click of Run Analysis Button Click
  getRunAnalysisService(payload: any): Observable<any>{
    return this.http.post(`${RUN_ALGO_URLS.INIT_RUN_ANALYSIS_URL}`,payload);
  }

  // getRunDataService(raID?:any, raPayload?:any): Observable<any> {
  //   // return this.http.post(`${RUN_ALGO_URLS.GET_RUN_ANALYSIS_List_URL}/${raID}/run_list`, raPayload);
  //   return this.http.get(`${RUN_ALGO_URLS.GET_RUN_ANALYSIS_List_URL}`);  // Remove this mock url
  // }
  getConfigurationColumnsService(): any{
    return RunAnalysisConfigurationMapper;
  }


  showRunAnalysis(id: any){
    return this.http.get(`${RUN_ALGO_URLS.RUN_ANALYSIS_STATUS_COUNT_URL}/${id}/status_count`);
  }

  getSelectedFilesOfRunAnalysis(){
    return this.http.get(`${RUN_ALGO_URLS.GET_SELECTED_FILES_OF_RUN_ANALYSIS}`);  //Remove this mock url
  }

  getRunAnalysisDetails(id:any){
    // return this.http.get(`${RUN_ALGO_URLS.RUN_ANALYSIS_DETAIL_url}`);
    return this.http.get(`${RUN_ALGO_URLS.RUN_ANALYSIS_DETAIL_url}/${id}`);

  }

  getViewAnalysisData(payload: any): Observable<any> {
    return this.http.post(`${RUN_ALGO_URLS.GET_VIEW_RUN_ANALYSIS}`, payload);
    // return this.http.get(RUN_ALGO_URLS.GET_VIEW_RUN_ANALYSIS);   // Remove this mock url
  }

}
