import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { PlayerFormComponent } from '../components/player-form/player-form.component';
import { PlayerListComponent } from '../components/player-list/player-list.component';
import { PaginationComponent } from '../components/pagination/pagination.component';
import { ResultPageComponent } from '../components/result-page/result-page.component';
import { PlayerDeleteComponent } from '../components/player-delete/player-delete.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PlayerFormComponent,
    PlayerListComponent,
    PaginationComponent,
    ResultPageComponent,
    PlayerDeleteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
