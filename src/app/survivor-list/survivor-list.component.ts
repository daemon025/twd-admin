import { Component, OnInit } from '@angular/core';
import { SurvivorService } from './survivor.service';
import { Survivor, SurvivorClass, SurvivorType } from './survivor';

@Component({
  selector: 'app-survivor-list',
  templateUrl: './survivor-list.component.html',
  styleUrls: ['./survivor-list.component.css']
})
export class SurvivorListComponent implements OnInit {
  survivors: Survivor[];
  filteredSurvivors: Survivor[];

  constructor(private survivorService: SurvivorService) { }

  ngOnInit(): void {
    this.survivorService.getSurvivors().subscribe(res => {
      this.survivors = res;
      this.filteredSurvivors = this.survivors;
    });
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
