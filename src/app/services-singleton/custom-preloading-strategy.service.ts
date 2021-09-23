import { Injectable } from "@angular/core";
import { PreloadingStrategy, Route } from "@angular/router";
import { Observable, of, timer } from "rxjs";

@Injectable()
export class CustomPreloadingStrategyService implements PreloadingStrategy {
    preload(route: Route, load: () => Observable<any>): Observable<any> {
        if (route.data && route.data.preload) {
            return load();
        }
        else {
            return of(null);
        }
    }
}