import { Injectable } from '@angular/core';
import { Survivor } from './survivor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, empty } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SurvivorService {
  constructor(private http: HttpClient) { }

  getSurvivors(): Observable<Survivor[]> {
    let survivors: Survivor[] = [];
    let headers = new HttpHeaders();
    headers.set('User-Agent', 'Mozilla/5.0 (Windows NT 6.2; WOW64; rv:22.0) Gecko/20100101 Firefox/22.0');
    headers.set('DNT', '1');
    headers.set('Accept', 'text/csv');
    headers.set('Accept-Encoding', 'deflate');
    headers.set('Accept-Language', 'en-US,en;q=0.5');

    console.log('Gettings survivors');
    return this.http.get('https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/1YzhrglHp4EE8yIs1EDnv68fiFkuX3BpeoYkjapmL9nk/export?format=csv&gid=1662887305', {
      headers: headers
    })
      .pipe(
        map((response: string) => {
          console.log(response);

          return survivors;
      }),
        catchError((err, caught) => {
          console.log(err);
          return empty();
      }));
  }
}
