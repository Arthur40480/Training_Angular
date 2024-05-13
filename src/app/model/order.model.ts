
export class Order {
    static idCounter = 1;
    id : number;
    amount : number;

    constructor(amount:number) {
        this.id = Order.idCounter++;
        this.amount = amount;
    }
}