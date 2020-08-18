import { StringifyOptions } from "querystring";

export class Survivor {
    name: string;
    image: string;
    level: number;
    class: 'Assault' | 'Bruiser' | 'Hunter' | 'Scout' | 'Shooter' | 'Warrior';
    rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Elite' | 'Elite2' | 'Elite3' | 'Elite4' | 'Elite5';
    traits: SurvivorTrait[];
    hero: boolean;
}

export class SurvivorTrait {
    name: string;
    level: number;
}
