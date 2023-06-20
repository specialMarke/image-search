import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
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

  searchResult$: Observable<SearchResult[]> = this._refreshSub.pipe(
    switchMap(() => this._service.listBy(this.route.queryParamMap))
  );
  formGroup = new FormGroup({
    search: new FormControl(),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _service: ApiService
  ) {}

  searchForImages(): void {
    const term = this.formGroup.controls['search'].value;

    this.router.navigate([''], { queryParams: { term: term } });

    this._refreshSub.next();
  }
}
