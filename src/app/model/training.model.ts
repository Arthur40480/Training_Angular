export class Training {
    id? : number;
    name : string;
    description : string;
    price : number;
    quantity : number;

    constructor(name:string,description:string,price:number) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = 1;
    }
}
