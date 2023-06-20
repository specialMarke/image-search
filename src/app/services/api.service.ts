import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { OpenverseSearchResultDto } from '../dtos/openverse-search-result.dto';
import { SearchResult } from '../models/search-result';
import { SearchResultMapper } from './search-result.mapper';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private _baseUrl: string = 'https://api.openverse.engineering/v1';
  private _searchResult: SearchResult[] = [];
  private _currentSearchTerm: string | null = null;

  constructor(private _http: HttpClient) {}

  getOneBy(id: string): Observable<SearchResult | null> {
    if (this._searchResult.length > 0) {
      const result = this._searchResult.find((item) => item.id === id) ?? null;
      return of(result);
    }

    return this._http.get<any>(`${this._baseUrl}/images/${id}`).pipe(
      map((result) => {
        if (!result) return null;

        return SearchResultMapper.toSingle(result);
      })
    );
  }

  listBy(term: string): Observable<SearchResult[]> {
    if (this._currentSearchTerm !== null && term === '') {
      term = this._currentSearchTerm;
    }

    if (term.trim().length === 0 || term === null) return of([]);

    this._currentSearchTerm = term;

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
