import { Observable } from "rxjs";
import { Category as CategoryEnum } from "../shared/enums/category";
import { Category } from "../models/category/category";
import { Paging } from "../models/paging/paging";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    constructor(
        private http: HttpClient,
        private localStorageService: LocalStorageService
    ) { }

    getCategory(category: CategoryEnum): Observable<Paging<Category>> {
        let headers = new HttpHeaders();

        const authorizationToken = this.localStorageService.getToken();
        if (authorizationToken) {
            headers = headers.set('Authorization', `Bearer ${authorizationToken}`);
        }

        const categoryName = CategoryEnum[category].toLowerCase();
        // TODO: Move base route to constant
        return this.http.get<Paging<Category>>(`https://api.spotify.com/v1/browse/categories/${categoryName}`, {
            headers
        });
    }

    getAll(): Observable<Paging<Category>> {
        let headers = new HttpHeaders();

        const authorizationToken = this.localStorageService.getToken();
        if (authorizationToken) {
            headers = headers.set('Authorization', `Bearer ${authorizationToken}`);
        }

        return this.http.get<Paging<Category>>('https://api.spotify.com/v1/browse/categories', {
            headers
        }).pipe(
            map(data => data['categories'])
        );
    }
}