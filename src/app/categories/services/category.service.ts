import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HeadersService } from "src/app/services-singleton/headers.service";
import { Category as CategoryEnum } from "src/app/shared/enums/category";
import { Paging } from "src/app/models/paging/paging";
import { Category } from "src/app/models/category/category";
import { ObjectValidator } from "src/app/shared/validators/object-validator";
import { RouteConstants } from "src/app/shared/constants/route-constants";
import { PageArguments } from "src/app/shared/page-arguments";
import { PaginationUtility } from "src/app/shared/utilities/pagination-utility";

@Injectable()
export class CategoryService {
    constructor(
        private http: HttpClient,
        private headersService: HeadersService
    ) { }

    getCategory(category: CategoryEnum): Observable<Paging<Category>> {
        ObjectValidator.notNullOrUndefinied(category, 'category');

        const headers = this.headersService.getClientHeaders();

        const categoryName = CategoryEnum[category].toLowerCase();
        return this.http.get<Paging<Category>>(`${RouteConstants.BASE}/browse/categories/${categoryName}`, {
            headers
        });
    }

    getCategories(pageArgs: PageArguments): Observable<Paging<Category>> {
        ObjectValidator.notNullOrUndefinied(pageArgs, 'category');

        const headers = this.headersService.getClientHeaders();

        let params = new HttpParams();
        params = PaginationUtility.addPaginationParams(params, pageArgs);

        return this.http.get<Paging<Category>>(`${RouteConstants.BASE}/browse/categories`, {
            headers, params
        }).pipe(
            map(data => data['categories'])
        );
    }
}