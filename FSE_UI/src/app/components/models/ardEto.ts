import { StudyEto } from "./studyEto";
import { PaginationEto, SortEto } from "./pageRequest";
export interface CreateArdRequestEto {
    name: string;
    updatable: boolean;
    visibility?: number;
}

export interface CreateArdResponseEto {
    status: string;
    message: string;
    ARDUniqID: string;
}

export interface IdpArdResponseEto {
    data: GetArdEto;
}

export interface GetArdEto {
    items: StudyEto[];
    summary: IdpArdEto;
    isLastPage: boolean;
}
export interface IdpArdEto {
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
export interface IdpArdRequestEto {
    filters: any[],
    sort: SortEto,
    pagination: PaginationEto
}


export interface getArdListResponseEto {
    access: ACCESS_CHECK;
}


export enum ACCESS_CHECK {
    everyone = 'everyone',
    private = 'private'
}

export interface DuplicateArdResponseEto {
    status: string;
    message: string;
    ARDUniqID: string;
}

