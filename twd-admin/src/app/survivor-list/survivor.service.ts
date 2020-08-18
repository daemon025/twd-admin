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
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');

    console.log('Gettings survivors');
    return this.http.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vS3_Kwfc_kEJgBNvKvLUmXU7dBKzg_dVMGyqX1YvpohFGTu1_p9404GshnJRNdtV3eeIdyYhoDOweBn/pub?gid=1662887305&single=true&output=csv', {
      headers: headers
    })
      .pipe(
        map(response => {
          console.log(response);

          return survivors;
      }),
        catchError((err, caught) => {
          console.log(err);
          return empty();
      }));
  }
}
