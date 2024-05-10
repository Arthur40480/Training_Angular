import { Training } from "./training.model";

export class Category {
    id : number;
    name : string;
    trainings : Training [];

    constructor(id:number, name:string, trainings: Training []) {
        this.id = id;
        this.name = name;
        this.trainings = trainings;
    }
}