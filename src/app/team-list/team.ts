import { Survivor } from '../survivor-list/survivor';

export class Team {
    id: number;
    name: string;
    members: string[];

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.members = [];
    }
}