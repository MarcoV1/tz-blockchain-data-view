import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TzBlockListComponent } from './components/tz-block-list/tz-block-list.component';
import { TzBlockDetailComponent } from './components/tz-block-detail/tz-block-detail.component';
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {EffectsModule} from "@ngrx/effects";
import {TzEffects} from "../rx-shared/tz.effects";
import {StoreModule} from "@ngrx/store";
import {blocksReducer} from "../rx-shared/tz.reducer";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    TzBlockListComponent,
    TzBlockDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      blocks: blocksReducer,
    }),
    EffectsModule.forRoot([TzEffects]),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
