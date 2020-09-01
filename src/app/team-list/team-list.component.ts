import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeamService } from './team.service';
import { Team } from './team';
import { Subscriber, Subscription, Observable, forkJoin } from 'rxjs';
import { SurvivorService } from '../survivor-list/survivor.service';
import { Survivor } from '../survivor-list/survivor';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit, OnDestroy {
  teams: Team[];
  survivors: Survivor[];
  sub$: Subscription; 

  constructor(private teamService: TeamService, private survivorService: SurvivorService) {  }

  ngOnInit(): void {
    const tasks$ = [];
    tasks$.push(this.teamService.getTeams());
    tasks$.push(this.survivorService.getSurvivors());

    this.sub$ = forkJoin(tasks$).subscribe(([teams, survivors]: [Team[], Survivor[]]) => {
      this.teams = teams;
      this.survivors = survivors;
    });
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  getSurvivor(name: string): Survivor {
    return this.survivors.find((s: Survivor) => s.name == name);
  }
}
