import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { pluck, map } from 'rxjs/operators';
import { RouteConstants } from '../shared/constants/route-constants';
import { RegionCode } from '../shared/enums/region-code';
import { MainConstants } from '../shared/constants/main-constants';

const COUNTRY_CODE_PROPERTY = 'country_code';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(
    private http: HttpClient
  ) { }

  getRegionCode(): Observable<RegionCode> {
    const url = `${RouteConstants.APISTACK_BASE_URL}/check?access_key=${MainConstants.IP_STACK_API_KEY}`;
    const data$ = this.http.get<JSON>(url).pipe(
      pluck<JSON, string>(COUNTRY_CODE_PROPERTY),
      map<string, RegionCode>(cc => RegionCode[cc])
    );

    return data$;
  }
}
