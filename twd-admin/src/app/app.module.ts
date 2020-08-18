import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { SurvivorListComponent } from './survivor-list/survivor-list.component';
import { TeamListComponent } from './team-list/team-list.component';
import { SurvivorComponent } from './survivor-list/survivor/survivor.component';

@NgModule({
  declarations: [
    AppComponent,
    SurvivorListComponent,
    TeamListComponent,
    SurvivorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
