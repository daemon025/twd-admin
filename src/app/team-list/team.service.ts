import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team } from './team';
import { Observable, of, empty } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SurvivorService } from '../survivor-list/survivor.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private teams: Team[];
  readonly proxyUrl: string = 'https://cors-anywhere.herokuapp.com/';
  readonly teamUrl: string = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS3_Kwfc_kEJgBNvKvLUmXU7dBKzg_dVMGyqX1YvpohFGTu1_p9404GshnJRNdtV3eeIdyYhoDOweBn/pub?gid=1078435730&single=true&output=csv';

  constructor(private httpClient: HttpClient, private survivorService: SurvivorService) { }

  getTeams(): Observable<Team[]> {
    if (this.teams)
      return of(this.teams);

    return this.httpClient.get(`${this.proxyUrl}${this.teamUrl}`, { responseType: 'text' }).pipe(
      map((response: string) => {
        let teams: Team[] = [];
        const lines = response.split('\r\n');
        const header = lines[0].split(',');

        for (var i = 1; i < lines.length; i++) {
          const arr = lines[i].split(',');

          let name = arr[header.indexOf('Name')].trim();
          let team = new Team(i, name);

          team.members.push(arr[header.indexOf('Leader')]);
          team.members.push(arr[header.indexOf('Member1')]);
          team.members.push(arr[header.indexOf('Member2')]);
          teams.push(team);
        }

        this.teams = teams;
        return this.teams;
      }),
      catchError(err => {
        console.error(err);
        return empty();
      })
    );
  }
}
