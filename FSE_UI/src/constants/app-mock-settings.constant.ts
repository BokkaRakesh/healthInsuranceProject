import { environment } from "../environment/environment";
import ViewRunAnalysis from './../assets/mockData/view-run-analysis.json';
 
export const AUTH_BASE_URL = `${environment.protocol}${environment.host}${environment.authPort}`;
 
export const salt = 'ODQ5ODMwZjItNDgyYi00ZDY2LThiNjUtNDk5ZTYwMDNmZWJkT0RRNU9ETXdaakl0TkRneVlpMDBaRFkyTFRoaU5qVXRORGs1WlRZd01ETm1aV0pr';
export const ACCOUNT_CONSTANTS = {
  userUrl: AUTH_BASE_URL,
  ACCESS_TOKEN: 'access_token',
  RSLT: 'rslt',
  CSRF: 'csrftoken',
  SSO_AUTH_URL: AUTH_BASE_URL + '/api/user/auth',
  USER: 'user',
  STUDY_CATALOG: 'Data Catalog',
  UBER_DATA_ANNOTATION : `${environment.dataAnnotationURL}`,
  NLQ_URL: `${AUTH_BASE_URL}/assets/mockData/idp.json` // Remove this constant
}
 
export const IDP_URLS = {
  CREATE_IDP_URL: `${AUTH_BASE_URL}/assets/mockData/createIdp.json`, // Remove this constant
  GET_IDP_URL: `${AUTH_BASE_URL}/assets/mockData/getIdp.json`, // Remove this constant
  GET_IDP_DETAIL_URL: `${AUTH_BASE_URL}/assets/mockData/getIdp.json` , // Remove this constant
  GET_IDP_SUBJECTS_URL: `${AUTH_BASE_URL}/assets/mockData/subjects.json`, // Remove this constant
  GET_IDP_FILES_URL: `${AUTH_BASE_URL}/assets/mockData/files.json`, // Remove this constant
  GET_IDP_CATALOG_URL: `${AUTH_BASE_URL}/assets/mockData/idpCatalog.json`, // Remove this constant
  EXPLORE_DATA_URL: `${AUTH_BASE_URL}/assets/mockData/exploreData.json`, // Remove this constant
  GET_EXPLORE_DATA_DOC_URL: `${AUTH_BASE_URL}/assets/mockData/explore-data-doc.json`, // Remove this constant
  GET_CLINICAL_DATA_URL: `${AUTH_BASE_URL}/assets/mockData/getClinicalData.json`, // Remove this constant
  GET_SUBJECT_DOCUMENTATION_URL: `${AUTH_BASE_URL}/assets/mockData/subjectDocumentation.json`, // Remove this constant
  GET_SUBJECT_ACTIVITIES_URL: `${AUTH_BASE_URL}/assets/mockData/subjectActivities.json`, // Remove this constant
  GET_IDP_SUBJECTS_FILES_URL: `${AUTH_BASE_URL}/api/idp/catalog`,
  GET_REQUEST_STUDY_URL: `${AUTH_BASE_URL}/assets/mockData/study-request-access.json`,
  GET_REQUEST_IDP_URL: `${AUTH_BASE_URL}/assets/mockData/idp-request-access.json`,
  GET_REQUEST_STUDY_LIST_IDP_URL:`${AUTH_BASE_URL}/assets/mockData/request-study-list-idp.json`
}
 
 
export const ARD_URLS = {
  CREATE_ARD_URL: `${AUTH_BASE_URL}/assets/mockData/createARD.json`, // Remove this constant
  GET_ARDS_List_URL: `${AUTH_BASE_URL}/assets/mockData/idp-ards.json`, // Remove this constant
  GET_ARD_DETAIL_URL: `${AUTH_BASE_URL}/assets/mockData/getArd.json`, // Remove this constant
  GET_ARD_SUBJECTS_URL:`${AUTH_BASE_URL}/assets/mockData/ard-subjects.json`, // Remove this constant
  GET_ARD_FILES_URL: `${AUTH_BASE_URL}/assets/mockData/ard-files.json`, // Remove this constant
  DUPLICATE_CREATE_ARD_URL: `${AUTH_BASE_URL}/assets/mockData/duplicate-ard.json`, // Remove this constant
  GET_COLLABORATOR_USERS_URL: `${AUTH_BASE_URL}/assets/mockData/collaborator-user-list.json`, //Remove this constant
  GET_ARD_INSIGHT: `${AUTH_BASE_URL}/assets/mockData/ard-insights.json`, // Remove this constant
  GET_ARD_CLINICAL: `${AUTH_BASE_URL}/assets/mockData/ard-clinical.json`, // Remove this constant
  GET_ARD_ATTACHMENTS_List_URL: `${AUTH_BASE_URL}/assets/mockData/ard-attachment.json`, // Remove this constant
  ADD_ARD_ATTACHMENTS_URL: `${AUTH_BASE_URL}/api/ard`
}

export const ALGO_URLS = {
  GET_ALGO_CATALOG_URL: `${AUTH_BASE_URL}/assets/mockData/algo-catalog.json`, // Remove this constant
  GET_ALGO_VERSION_DETAIL_URL: `${AUTH_BASE_URL}/assets/mockData/algo-version-detail.json`, // Remove this constant
}

export const HOME_URLS = {
  GET_ACTFAV_URL: `${AUTH_BASE_URL}/assets/mockData/activities-favorite.json`, // Remove this constant
}

export const RUN_ALGO_URLS = {
  GET_SELECTED_FILES_OF_RUN_ANALYSIS :  `${AUTH_BASE_URL}/assets/mockData/selected-files-of-run-analysis.json`,
  RUN_ANALYSIS_STATUS_COUNT_URL: `${AUTH_BASE_URL}/assets/mockData/run-analysis-status-count.json`,
  INIT_RUN_ANALYSIS_URL:`${AUTH_BASE_URL}/api/analysis/run`,
  RUN_ANALYSIS__STATUS_COUNT_URL:`${AUTH_BASE_URL}/api/analysis`,
  GET_VIEW_RUN_ANALYSIS: `${AUTH_BASE_URL}/assets/mockData/view-run-analysis.json`, // Remove this constant
  RUN_ANALYSIS_DETAIL_url: `${AUTH_BASE_URL}/assets/mockData/run-analysis-detail-pop-up.json`,
  GET_RUN_ANALYSIS_List_URL: `${AUTH_BASE_URL}/assets/mockData/run-section.json`,   // Remove this constant
  GET_ALGO_URL: `${AUTH_BASE_URL}/assets/mockData/algo-catalog.json`, // Remove this constant
  GET_ARD_URL: `${AUTH_BASE_URL}/assets/mockData/ard-catalog-run-analysis.json`,  // Remove this constant
  GET_ARD_DESC_URL: `${AUTH_BASE_URL}/assets/mockData/ard-catalog-run-analysis-desc.json`,  // Remove this constant
  GET_ALGO_CONFIG_URL: `${AUTH_BASE_URL}/assets/mockData/run-analysis-configuration.json`,  // Remove this constant
  GET_ADD_FILES_GRID_URL: `${AUTH_BASE_URL}/assets/mockData/run-analysis-add-files.json`,  // Remove this constant
}
 
export const GIPAI_URLS = {
  GET_GIPAI_HISTORY_URL: `${AUTH_BASE_URL}/assets/mockData/gipai-history.json`, // Remove this constant
  GET_GIPAI_CHAT_URL: `${AUTH_BASE_URL}/assets/mockData/gipai-chat.json`, // Remove this constant
}

export enum GenericError {
    APIConnectionError = 'Please establish your API Connection',
    Unauthorized = 'Unauthorized',
    PageNotFound = 'Page Not Found',
    default = 'Something went wrong. Please try again later.',
    NoAcceess = 'User does not have access to the Uber Platform',
    ContentNotFound = 'Content not found',
    MethodNotAllowed = "The requested method is not allowed for this resource.",
    NotImplemented = "Sorry, this feature is not implemented yet.",
    BadGateway = "Oops! There was a problem with the gateway server. Please try again later.",
    HTTPVersionNotSupported = "The HTTP version used in the request is not supported by the server.",
    InsufficientStorage = "Sorry, the server has insufficient storage to process the request.",
    LoopDetected = "Sorry, there is a loop in the request processing. Please try again later.",
    NetworkAuthenticationRequired = "Authentication is required to access this resource.",
    NetworkConnectTimeout = "Sorry, the connection to the server timed out. Please check your internet connection and try again.",
    InternetConnectionError = "Please check your internet connection.",
    ServiceUnavailable = "Sorry, the service is currently unavailable. Please try again later.",
    GatewayTimeout = "Sorry, the request to the server timed out. Please try again later.",
    InternalServerError = "Oops! Something went wrong on the server. Please try again later."
  };
