import { StringifyOptions } from "querystring";

export class Survivor {
    id: number;
    name: string;
    image: string;
    level: number;
    class: SurvivorClass;
    rarity: SurvivorRarity;
    traits: SurvivorTrait[];
    hero: boolean;

    constructor(id: number) {
        this.id = id;
        this.traits = [];
    }

    get rarityMultiplier() : number {
        return this.hero ? this.rarity + 1 : this.rarity;
    }
}

export enum SurvivorClass {
    Assault, Bruiser, Hunter, Scout, Shooter, Warrior
}

export enum SurvivorRarity {
    Common, Uncommon, Rare, Epic, Legendary, Elite, Elite2, Elite3, Elite4, Elite5
}

export class SurvivorTrait {
    name: string;
    level: number;

    constructor(name: string, level: number) {
        this.name = name;
        this.level = level;
    }
}
