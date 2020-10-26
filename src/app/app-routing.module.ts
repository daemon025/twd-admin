import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurvivorListComponent } from './survivor-list/survivor-list.component';
import { TeamListComponent } from './team-list/team-list.component';

const routes: Routes = [
  { path: '', component: SurvivorListComponent },
  { path: 'survivor', component: SurvivorListComponent },
  { path: 'team', component: TeamListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
