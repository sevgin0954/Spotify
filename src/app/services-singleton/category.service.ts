import { Observable } from "rxjs";
import { Category as CategoryEnum } from "../shared/enums/category";
import { Category } from "../models/category/category";
import { Paging } from "../models/paging/paging";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { RouteConstants } from "../shared/constants/route-constants";
import { LocalStorageService } from "./local-storage.service";
import { AuthUtility } from "../shared/utilities/auth-utility";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    constructor(
        private http: HttpClient,
        private localStorageService: LocalStorageService
    ) { }

    getCategory(category: CategoryEnum): Observable<Paging<Category>> {
        const authToken = this.localStorageService.getApiToken();
        let headers = new HttpHeaders();
        headers = AuthUtility.addAuthHeaders(headers, authToken);

        const categoryName = CategoryEnum[category].toLowerCase();
        return this.http.get<Paging<Category>>(`${RouteConstants.BASE}/browse/categories/${categoryName}`, {
            headers
        });
    }

    getCategories(limit: number): Observable<Paging<Category>> {
        const authToken = this.localStorageService.getApiToken();
        let headers = new HttpHeaders();
        headers = AuthUtility.addAuthHeaders(headers, authToken);

        let params = new HttpParams();
        params = params.set('limit', limit.toString());

        return this.http.get<Paging<Category>>(`${RouteConstants.BASE}/browse/categories`, {
            headers, params
        }).pipe(
            map(data => data['categories'])
        );
    }
}