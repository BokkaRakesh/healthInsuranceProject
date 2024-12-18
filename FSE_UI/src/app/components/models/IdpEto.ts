import { PaginationEto, SortEto } from "./pageRequest";
import { StudyEto } from "./studyEto";
export interface CreateIdpRequestEto {
    studies: CreateStudiesEto[];
    name: string;
    updatable: boolean;
}

export interface CreateIdpResponseEto {
    status: string;
    message: string;
    IDP_Unq_ID: string;
}

export interface CreateStudiesEto {
   StudyID: string,
   StudyNumber: string
}

export interface AddDescriptionRequestEto {
   IDP_Unq_ID: string,
   data: DescriptionEto
}

export interface DescriptionEto {
    description: string
}

export interface AddDescriptionResponseEto {
    status: string,
    message: string,
    description: string
}

export interface IdpResponseEto {
    data: GetIdpEto;
}

export interface GetIdpEto {
    items: StudyEto[];
    summary: IdpSummaryEto;
    isLastPage: boolean;
}

export interface IdpSummaryEto {
    studies: number;
    subjects: number;
    files: number;
    sessions: number;
    acquisitions: number;
    analyses: number;
    idp_unq_id: string;
    createdat: string;
    updatedat: string;
    createdby: string;
    updatedby: string;
    description: string;
    status: string;
    currentversion: string;
    idp_name: string;
    data_sources: string;
    modality: string;
}

export interface SummaryMetricsEto {
    icon: string;
    name: string;
    value: number
}

export interface SummaryDetailEto {
    dataSources: string,
    createdBy: string
    modalities: string,
    version: string,
    createdDate: string,
    updatedDate: string
}

export interface IdpSubjectAndFileRequestEto {
    filters: any[],
    sort: SortEto,
    pagination: PaginationEto
}
