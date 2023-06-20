import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParamMap } from '@angular/router';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import {
  OpenverseSearchResultDto,
  ResultDto,
} from '../dtos/openverse-search-result.dto';
import { SearchResult } from '../models/search-result';
import { SearchResultMapper } from './search-result.mapper';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private _baseUrl: string = 'https://api.openverse.engineering/v1';
  private _searchResult: SearchResult[] = [];

  term: string | null = null;

  constructor(private _http: HttpClient) {}

  getOneBy(id: string): Observable<SearchResult | null> {
    const hasCachedResults = this._searchResult.length > 0;

    if (hasCachedResults) {
      const result = this._searchResult.find((item) => item.id === id) ?? null;
      return of(result);
    }

    return this._http.get<ResultDto>(`${this._baseUrl}/images/${id}`).pipe(
      map((result) => {
        if (!result) return null;

        return SearchResultMapper.toSingle(result);
      })
    );
  }

  listBy(queryParamMap$: Observable<ParamMap>): Observable<SearchResult[]> {
    return queryParamMap$.pipe(
      switchMap((queryParamMap) => {
        this.term = queryParamMap.get('term');

        if (!this.term) return of([]);

        return this._listBy(this.term);
      })
    );
  }

  private _listBy(term: string): Observable<SearchResult[]> {
    return this._http
      .get<OpenverseSearchResultDto>(`${this._baseUrl}/images/?q=${term}`)
      .pipe(
        map((dto) => {
          return SearchResultMapper.toMultiple(dto);
        }),
        tap((result) => {
          this._searchResult = result;
        })
      );
  }
}
