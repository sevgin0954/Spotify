import { HttpParams } from "@angular/common/http";

export class PaginationUtility {
    static addPaginationParams(params: HttpParams, limit: number, offset: number): HttpParams {
        params = params.set('limit', limit.toString());
        params = params.set('offset', offset.toString());

        return params;
    }
}