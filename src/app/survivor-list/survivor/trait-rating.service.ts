import { Injectable, OnInit } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TraitRatingService implements OnInit {
  private proxyUrl = "https://cors-anywhere.herokuapp.com/";
  private normalTraitUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS3_Kwfc_kEJgBNvKvLUmXU7dBKzg_dVMGyqX1YvpohFGTu1_p9404GshnJRNdtV3eeIdyYhoDOweBn/pub?gid=1281684487&single=true&output=csv";
  private heroTraitUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS3_Kwfc_kEJgBNvKvLUmXU7dBKzg_dVMGyqX1YvpohFGTu1_p9404GshnJRNdtV3eeIdyYhoDOweBn/pub?gid=1169007553&single=true&output=csv";

  private normalTraitRatings: ITraitRating[] = [];
  private heroTraitRatings: ITraitRating[] = [];

  constructor(private http: HttpClient) { }

  ngOnit() {
    this.http.get(this.proxyUrl + this.normalTraitUrl, {
      responseType: 'text'
    })
      .pipe(
        map((response: string) => {
          this.normalTraitRatings = this.parseNormalTraits(response);
        }),
        catchError((err, caught) => {
          console.log(err);
          return empty();
        }));

    this.http.get(this.proxyUrl + this.heroTraitUrl, {
      responseType: 'text'
    })
      .pipe(
        map((response: string) => {
          this.normalTraitRatings = this.parseHeroTraits(response);
        }),
        catchError((err, caught) => {
          console.log(err);
          return empty();
        }));
  }

  

  private parseNormalTraits(csv: string): ITraitRating[] {
    return [];
  }

  private parseHeroTraits(csv: string): ITraitRating[] {
    return [];
  }
}

interface ITraitRating {
  name: string;
  value: number;
}
