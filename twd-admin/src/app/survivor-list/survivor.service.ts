import { Injectable } from '@angular/core';
import { Survivor, SurvivorTrait, SurvivorClass, SurvivorRarity } from './survivor';
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
      headers: headers,
      responseType: 'text'
    })
      .pipe(
        map((response: string) => {
          console.log(response);
          const lines = response.split('\n');
          const header = lines[0].split(',');

          for (var i = 1; i < lines.length; i++) {
            const arr = lines[i].split(',');

            let survivor = new Survivor(i);
            survivor.name = arr[header.indexOf('Name')];
            survivor.image = arr[header.indexOf('Image')];
            survivor.level = Number(arr[header.indexOf('Level')]);
            survivor.class = SurvivorClass[arr[header.indexOf('Class')]];
            survivor.rarity = SurvivorRarity[arr[header.indexOf('Rarity')]];

            if (arr[header.indexOf('Traits')])
              survivor.traits.push(this.getTrait(arr[header.indexOf('Traits')]));
            if (arr[header.indexOf('Traits') + 1])
              survivor.traits.push(this.getTrait(arr[header.indexOf('Traits') + 1]));
            if (arr[header.indexOf('Traits') + 2])
              survivor.traits.push(this.getTrait(arr[header.indexOf('Traits') + 2]));
            if (arr[header.indexOf('Traits') + 3])
              survivor.traits.push(this.getTrait(arr[header.indexOf('Traits') + 3]));
            if (arr[header.indexOf('Traits') + 4])
              survivor.traits.push(this.getTrait(arr[header.indexOf('Traits') + 4]));

            survivors.push(survivor);
            //break;
          }

          return survivors;
        }),
        catchError((err, caught) => {
          console.log(err);
          return empty();
        }));
  }

  private getTrait(line: string): SurvivorTrait {
    const nameRegex = new RegExp('[a-zA-Z ]+');
    const levelRegex = new RegExp('([0-9])');
    if (nameRegex.test(line) && levelRegex.test(line)) {
      return new SurvivorTrait(nameRegex.exec(line)[0].trim(), Number(levelRegex.exec(line)[0]));
    }
    return null;
  }

  private indexOf(line: string, column: string): number {
    const lines = line.split(',');
    return lines.indexOf(column);
  }
}
