import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageDetailsComponent } from './components/image-details/image-details.component';
import { SearchListComponent } from './components/search-list/search-list.component';
import { ImageDetailsResolver } from './services/image-details.resolver';

const routes: Routes = [
  {
    path: '',
    component: SearchListComponent,
  },
  {
    path: ':id',
    component: ImageDetailsComponent,
    resolve: { image: ImageDetailsResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
