import { Component, OnInit, OnDestroy } from '@angular/core';
import { SurvivorService } from './survivor.service';
import { Survivor, SurvivorClass, SurvivorType } from './survivor';
import { Team } from '../team-list/team';
import { TeamService } from '../team-list/team.service';
import { Subscription, forkJoin } from 'rxjs';

@Component({
  selector: 'app-survivor-list',
  templateUrl: './survivor-list.component.html',
  styleUrls: ['./survivor-list.component.css']
})
export class SurvivorListComponent implements OnInit, OnDestroy {
  survivors: Survivor[];
  teams: Team[];
  filteredSurvivors: Survivor[];
  sub$: Subscription;

  constructor(private survivorService: SurvivorService, private teamService: TeamService) { }

  ngOnInit(): void {
    let tasks$ = [];
    tasks$.push(this.survivorService.getSurvivors());
    tasks$.push(this.teamService.getTeams());

    this.sub$ = forkJoin(tasks$).subscribe(([survivors, teams]: [Survivor[], Team[]]) => {
      this.survivors = survivors;
      this.filteredSurvivors = this.survivors;
      this.teams = teams;
    });
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  filter(filterId: number) {
    if (filterId === 0) {
      this.filteredSurvivors = this.survivors;
    } else if (filterId === 1) {
      this.filteredSurvivors = this.survivors.filter((s: Survivor) => s.type == SurvivorType.AHR || s.type == SurvivorType.HR);
    } else if (filterId === 2) {
      this.filteredSurvivors = this.survivors.filter((s: Survivor) => s.class == SurvivorClass.Assault);
    } else if (filterId === 3) {
      this.filteredSurvivors = this.survivors.filter((s: Survivor) => s.class == SurvivorClass.Scout);
    } else if (filterId === 4) {
      this.filteredSurvivors = this.survivors.filter((s: Survivor) => s.class == SurvivorClass.Warrior);
    } else if (filterId === 5) {
      this.filteredSurvivors = this.survivors.filter((s: Survivor) => s.class == SurvivorClass.Bruiser);
    } else if (filterId === 6) {
      this.filteredSurvivors = this.survivors.filter((s: Survivor) => s.class == SurvivorClass.Hunter);
    } else if (filterId === 7) {
      this.filteredSurvivors = this.survivors.filter((s: Survivor) => s.class == SurvivorClass.Shooter);
    }
  }

}
