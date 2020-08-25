import { Pipe, PipeTransform } from '@angular/core';
import { Survivor, SurvivorTrait } from './survivor';

@Pipe({
  name: 'survivor'
})
export class SurvivorPipe implements PipeTransform {

  transform(value: Survivor[], ...args: unknown[]):  Survivor[] {
    return value.sort((a: Survivor, b: Survivor) => b.level - a.level 
      || b.rarityMultiplier - a.rarityMultiplier);
  }

}
