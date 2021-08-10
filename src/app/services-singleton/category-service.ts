import { Observable } from "rxjs";
import { Category as CategoryEnum } from "../shared/enums/category";
import { Category } from "../models/category/category";
import { Paging } from "../models/paging/paging";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { RouteConstants } from "../shared/constants/route-constants";
import { AuthHeaderService } from "./auth-headers-service";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    constructor(
        private http: HttpClient,
        private authHeaderService: AuthHeaderService
    ) { }

    getCategory(category: CategoryEnum): Observable<Paging<Category>> {
        let headers = new HttpHeaders();
        headers = this.authHeaderService.addApiAuthHeaders(headers);

        const categoryName = CategoryEnum[category].toLowerCase();
        return this.http.get<Paging<Category>>(`${RouteConstants.BASE}/browse/categories/${categoryName}`, {
            headers
        });
    }

    getAll(): Observable<Paging<Category>> {
        let headers = new HttpHeaders();
        headers = this.authHeaderService.addApiAuthHeaders(headers);

        return this.http.get<Paging<Category>>(`${RouteConstants.BASE}/browse/categories`, {
            headers
        }).pipe(
            map(data => data['categories'])
        );
    }
}