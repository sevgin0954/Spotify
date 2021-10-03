import { HttpParams } from "@angular/common/http";
import { PageArguments } from "../page-arguments";

export class PaginationUtility {
    static addPaginationParams(params: HttpParams, pageArgs: PageArguments): HttpParams {
        params = params.set('limit', pageArgs.limit.toString());
        params = params.set('offset', pageArgs.offset.toString());

        return params;
    }
}