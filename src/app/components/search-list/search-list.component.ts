import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { SearchResult } from 'src/app/models/search-result';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchListComponent {
  private _refreshSub = new BehaviorSubject<void>(undefined);

  term: string | null = null;
  searchResult$: Observable<SearchResult[]> = this._refreshSub.pipe(
    switchMap(() => this._service.listBy(this._route.queryParamMap)),
    tap(() => (this.term = this._service.term))
  );

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _service: ApiService
  ) {}

  searchForImages(): void {
    this._router.navigate([''], { queryParams: { term: this.term } });

    this._refreshSub.next();
  }
}
