import {RouterModule, Routes} from "@angular/router";
import {TzBlockListComponent} from "./components/tz-block-list/tz-block-list.component";
import {TzBlockDetailComponent} from "./components/tz-block-detail/tz-block-detail.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {path : 'list', component : TzBlockListComponent},
  {path : 'details/:level', component : TzBlockDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
