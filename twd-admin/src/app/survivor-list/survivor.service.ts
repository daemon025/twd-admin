import { Injectable } from '@angular/core';
import { Survivor, SurvivorTrait, SurvivorClass, SurvivorRarity, SurvivorType } from './survivor';
import { HttpClient } from '@angular/common/http';
import { Observable, empty } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SurvivorService {
  constructor(private http: HttpClient) { }

  getSurvivors(): Observable<Survivor[]> {
    let survivors: Survivor[] = [];

    return this.http.get('https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/1YzhrglHp4EE8yIs1EDnv68fiFkuX3BpeoYkjapmL9nk/export?format=csv&gid=1662887305', {
      responseType: 'text'
    })
      .pipe(
        map((response: string) => {
          const lines = response.split('\n');
          const header = lines[0].split(',');

          for (var i = 1; i < lines.length; i++) {
            const arr = lines[i].split(',');

            let survivor = new Survivor(i);
            survivor.name = arr[header.indexOf('Name')].trim();
            survivor.shortName = arr[header.indexOf('ShortName')].trim();
            survivor.image = arr[header.indexOf('Image')];
            survivor.level = Number(arr[header.indexOf('Level')]);
            survivor.class = SurvivorClass[arr[header.indexOf('Class')]];
            survivor.rarity = SurvivorRarity[arr[header.indexOf('Rarity')]];
            survivor.type = SurvivorType[arr[header.indexOf('Type')]];

            const startingTraitIndex = header.indexOf('Traits');
            this.addTraits(survivor.traits, startingTraitIndex, arr);

            survivors.push(survivor);
          }

          return survivors;
        }),
        catchError((err, caught) => {
          console.log(err);
          return empty();
        }));
  }

  private getTrait(line: string): SurvivorTrait {
    const nameRegex = new RegExp('[a-zA-Z \'-]+');
    const levelRegex = new RegExp('([0-9])');
    if (nameRegex.test(line) && levelRegex.test(line)) {
      return new SurvivorTrait(nameRegex.exec(line)[0].trim(), Number(levelRegex.exec(line)[0]));
    }
    return null;
  }

  private addTraits(traits: SurvivorTrait[], startingIndex: number, arr: string[]): void {
    for (var i = 0; i < 5 + 5; i++) {
      const trait = this.getTrait(arr[startingIndex + i]);
      if (trait)
        traits.push(trait);
    }
  }

  private indexOf(line: string, column: string): number {
    const lines = line.split(',');
    return lines.indexOf(column);
  }
}
