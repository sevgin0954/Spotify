import { Observable } from "rxjs";
import { Category as CategoryEnum } from "../shared/enums/category";
import { Category } from "../models/category/category";
import { Paging } from "../models/paging/paging";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { RouteConstants } from "../shared/constants/route-constants";
import { HeadersService } from "./headers.service";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    constructor(
        private http: HttpClient,
        private headersService: HeadersService
    ) { }

    getCategory(category: CategoryEnum): Observable<Paging<Category>> {
        const headers = this.headersService.getClientHeaders();

        const categoryName = CategoryEnum[category].toLowerCase();
        return this.http.get<Paging<Category>>(`${RouteConstants.BASE}/browse/categories/${categoryName}`, {
            headers
        });
    }

    getCategories(limit: number): Observable<Paging<Category>> {
        const headers = this.headersService.getClientHeaders();

        let params = new HttpParams();
        params = params.set('limit', limit.toString());

        return this.http.get<Paging<Category>>(`${RouteConstants.BASE}/browse/categories`, {
            headers, params
        }).pipe(
            map(data => data['categories'])
        );
    }
}