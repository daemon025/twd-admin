import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { AppComponent } from './app.component';
import { SurvivorListComponent } from './survivor-list/survivor-list.component';
import { TeamListComponent } from './team-list/team-list.component';
import { SurvivorComponent } from './survivor-list/survivor/survivor.component';
import { SurvivorPipe } from './survivor-list/survivor.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SurvivorListComponent,
    TeamListComponent,
    SurvivorComponent,
    SurvivorPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatButtonModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
