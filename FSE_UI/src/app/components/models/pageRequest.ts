
export enum SORTING_ORDER {
    ASC = 'ASC',
    DESC = 'DESC'
}

export interface SortEto {
    field: string;
    order: SORTING_ORDER
}

export interface PaginationEto {
    currentPage?: number;
    pageSize?: number;
    totalCount?: number;
    page?: number;
}

export interface AlgoDevFlowEto {
    name: string;
    icon: string;
    checked: boolean;
    selected: boolean;
  }