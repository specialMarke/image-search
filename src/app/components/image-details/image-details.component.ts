import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { SearchResult } from 'src/app/models/search-result';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageDetailsComponent {
  image$: Observable<SearchResult | null> = this._route.data.pipe(
    map((data) => data['image'])
  );

  constructor(private _route: ActivatedRoute) {}
}
