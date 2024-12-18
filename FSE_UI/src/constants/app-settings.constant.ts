
import { environment } from "../environment/environment";
 
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
  // NLQ_URL: `${AUTH_BASE_URL}/api/search/getstudies`
  NLQ_URL: `${AUTH_BASE_URL}/assets/mockData/idp.json` // Remove this constant
}
 
export const IDP_URLS = {
  CREATE_IDP_URL: `${AUTH_BASE_URL}/assets/mockData/createIdp.json`, // Remove this constant
  GET_IDP_URL: `${AUTH_BASE_URL}/assets/mockData/getIdp.json`, // Remove this constant
  GET_IDP_DETAIL_URL: `${AUTH_BASE_URL}/assets/mockData/getIdp.json` , // Remove this constant
  GET_IDP_SUBJECTS_URL: `${AUTH_BASE_URL}/assets/mockData/subjects.json`, // Remove this constant
  GET_IDP_FILES_URL: `${AUTH_BASE_URL}/assets/mockData/files.json`, // Remove this constant
  GET_IDP_CATALOG_URL: `${AUTH_BASE_URL}/assets/mockData/idpCatalog.json`, // Remove this constant
  EXPLORE_DATA_URL: `${AUTH_BASE_URL}/assets/mockData/exploreData.json`,
  GET_CLINICAL_DATA_URL: `${AUTH_BASE_URL}/assets/mockData/getClinicalData.json`, // Remove this constant
  // CREATE_IDP_URL: `${AUTH_BASE_URL}/api/data/idp`,
  // GET_IDP_URL: `${AUTH_BASE_URL}/api/search/getidpdetails/id`,
  // GET_IDP_DETAIL_URL: `${AUTH_BASE_URL}/api/data/idp`,
  // GET_IDP_SUBJECTS_URL: `${AUTH_BASE_URL}/api/idp/catalog`,
  // GET_IDP_FILES_URL: `${AUTH_BASE_URL}/api/idp/catalog`,
  // GET_IDP_CATALOG_URL: `${AUTH_BASE_URL}/api/data/idp/catalog`,
  // EXPLORE_DATA_URL: `${AUTH_BASE_URL}/api/search/getstudies`
  GET_EXPLORE_DATA_DOC_URL:`${AUTH_BASE_URL}/api/exploreDoc`,
}
 
 
export const ARD_URLS = {
  CREATE_ARD_URL: `${AUTH_BASE_URL}/assets/mockData/createIdp.json`, // Remove this constant
  GET_ARDS_List_URL: `${AUTH_BASE_URL}/assets/mockData/idp-ards.json`, // Remove this constant
  GET_ARD_DETAIL_URL: `${AUTH_BASE_URL}/assets/mockData/getArd.json`, // Remove this constant
  GET_ARD_SUBJECTS_URL:`${AUTH_BASE_URL}/assets/mockData/ard-subjects.json`, // Remove this constant
  GET_ARD_FILES_URL: `${AUTH_BASE_URL}/assets/mockData/ard-files.json`, // Remove this constant
  DUPLICATE_CREATE_ARD_URL: `${AUTH_BASE_URL}/assets/mockData/duplicate-ard.json`, // Remove this constant
  GET_COLLABORATOR_USERS_URL: `${AUTH_BASE_URL}/assets/mockData/collaborator-user-list.json`,
  GET_UPDATED_USER: `${AUTH_BASE_URL}/assets/mockData/updated-access-user-response.json`
  // CREATE_ARD_URL: `${AUTH_BASE_URL}/api/ard/idp`,
  // GET_ARDS_List_URL: `${AUTH_BASE_URL}/api/ard`,
  // GET_ARD_DETAIL_URL: `${AUTH_BASE_URL}/api/ard`,
  // GET_ARD_SUBJECTS_URL:`${AUTH_BASE_URL}/api/ard/catalog`,
  // GET_ARD_FILES_URL: `${AUTH_BASE_URL}/api/ard/catalog`,
  // DUPLICATE_CREATE_ARD_URL: `${AUTH_BASE_URL}/api/ard`,
  // GET_COLLABORATOR_USERS_URL: `${AUTH_BASE_URL}/api/ard`
}
export const ALGO_URLS = {
  // GET_ALGO_CATALOG_URL: `${AUTH_BASE_URL}/assets/mockData/algo-catalog.json`, // Remove this constant
  // GET_ALGO_VERSION_DETAIL_URL: `${AUTH_BASE_URL}/assets/mockData/algo-version-detail.json`, // Remove this constant
  GET_ALGO_CATALOG_URL: `${AUTH_BASE_URL}/api/algo/catalog`,
  GET_ALGO_VERSION_DETAIL_URL: `${AUTH_BASE_URL}/api/algo`
}
 
export const HOME_URLS = {
  // GET_ACTFAV_URL: `${AUTH_BASE_URL}/api/home`,
  GET_ACTFAV_URL: `${AUTH_BASE_URL}/assets/mockData/activities-favorite.json`, // Remove this constant
}
 
export const GIPAI_URLS = {
  GET_GIPAI_HISTORY_URL: `${AUTH_BASE_URL}/assets/mockData/gipai-history.json`, // Remove this constant
  // GET_GIPAI_HISTORY_URL: `${AUTH_BASE_URL}/api/history`,
  // GET_GIPAI_CHAT_URL: `${AUTH_BASE_URL}/assets/mockData/gipai-chat.json`, // Remove this constant
  GET_GIPAI_CHAT_URL: `${AUTH_BASE_URL}/api/gipai`,
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
 
 