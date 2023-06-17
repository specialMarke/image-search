import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { SearchResult } from 'src/app/models/search-result';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchListComponent {
  searchResult$: Observable<SearchResult[]> = this._service.listBy('');
  formGroup = new FormGroup({
    search: new FormControl(),
  });

  constructor(private _service: ApiService) {}

  searchForImages(): void {
    const term = this.formGroup.controls['search'].value;

    this.searchResult$ = this._service.listBy(term);
  }
}
