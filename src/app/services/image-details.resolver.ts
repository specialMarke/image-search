import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { SearchResult } from '../models/search-result';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class ImageDetailsResolver implements Resolve<SearchResult | null> {
  constructor(private _service: ApiService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<SearchResult | null>
    | Promise<SearchResult | null>
    | SearchResult
    | null {
    const id = route.paramMap.get('id');

    if (!id) return of(null);

    return this._service.getOneBy(id);
  }
}
