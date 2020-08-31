import { StringifyOptions } from "querystring";

export class Survivor {
    id: number;
    name: string;
    shortName: string;
    image: string;
    level: number;
    class: SurvivorClass;
    rarity: SurvivorRarity;
    traits: SurvivorTrait[];
    type: SurvivorType;

    constructor(id: number) {
        this.id = id;
        this.traits = [];
    }

    get rarityMultiplier(): number {
        return (this.type == SurvivorType.HR || this.type == SurvivorType.AHR) ? this.rarity + 1 : this.rarity;
    }

    get survivorClassIcon(): string {
        return '/assets/img/survivor-classes/' + SurvivorClass[this.class].toLowerCase() + '.png';
    }

    get starColors(): string[] {
        let result: string[] = [];
        if (this.rarity < SurvivorRarity.Elite) {
            for (var i = 0; i <= this.rarity; i++)
                result.push('grey-icon');
            return result;
        }
        const pinkStars = this.rarity - SurvivorRarity.Legendary;
        for (var i = 0; i < 5 - pinkStars; i++)
            result.push('grey-icon');
        for (var i = 0; i < pinkStars; i++)
            result.push('pink-icon');

        return result;
    }

    get rarityColor(): string {
        return `survivor-rarity-${SurvivorRarity[this.rarity].toLowerCase()}`;
    }
}

export enum SurvivorClass {
    Assault, Bruiser, Hunter, Scout, Shooter, Warrior
}

export enum SurvivorRarity {
    Common, Uncommon, Rare, Epic, Legendary, Elite, Elite2, Elite3, Elite4, Elite5
}

export enum SurvivorType {
    SRV, HR, AHR
}

export class SurvivorTrait {
    name: string;
    level: number;

    constructor(name: string, level: number) {
        this.name = name;
        this.level = level;
    }

    get survivorTraitIcon(): string {
        const reSpace = /\ /gi;
        const re = /\'/gi;
        return 'assets/img/survivor-traits/' + this.name.toLowerCase().replace(reSpace, '-').replace(re, '') + '.png';
    }
}
