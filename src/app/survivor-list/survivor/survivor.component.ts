import { Component, OnInit, Input } from '@angular/core';
import { Survivor } from '../survivor';
import { Team } from 'src/app/team-list/team';

@Component({
  selector: 'app-survivor',
  templateUrl: './survivor.component.html',
  styleUrls: ['./survivor.component.css']
})
export class SurvivorComponent implements OnInit {
  @Input() survivor: Survivor;
  @Input() teams: Team[];

  team: string;

  constructor() { }

  ngOnInit(): void {
    this.team = this.getTeam();
  }

  getUrl(survivor: Survivor): string {
    return `url('${survivor.image}')`;
  }

  private getTeam(): string | null {
    if (!this.teams) return null;

    let team = this.teams.find((t: Team) => t.members.some(m => m == this.survivor.name));
    return team != null ? team.name : null;
  }
}
