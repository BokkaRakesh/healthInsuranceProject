import { filterEto } from "./filterEto";
import { PaginationEto, SortEto } from "./pageRequest";

export interface NLQRequestEto {
    nlq: string[];
    filters?: filterEto[];
    sort?: SortEto;
    pagination?: PaginationEto
}