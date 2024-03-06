export class Customer {
    static idCounter = 3;
    id : number;
    name : string;
    lastname : string;
    adress : string;
    phone : string;
    email : string;

    constructor(name:string, lastname:string, adress:string, phone:string, email:string) {
        this.id = Customer.idCounter++;
        this.name = name;
        this.lastname = lastname;
        this.adress = adress;
        this.phone = phone;
        this.email = email;
    }

}
