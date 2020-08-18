import { Component, OnInit } from '@angular/core';
import { SurvivorService } from './survivor.service';
import { Survivor } from './survivor';

@Component({
  selector: 'app-survivor-list',
  templateUrl: './survivor-list.component.html',
  styleUrls: ['./survivor-list.component.css']
})
export class SurvivorListComponent implements OnInit {
  survivors: Survivor[];

  constructor(private survivorService: SurvivorService) { }

  ngOnInit(): void {
    this.survivorService.getSurvivors().subscribe(res => this.survivors = res);
  }

}
