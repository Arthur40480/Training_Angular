export class User {
    static idCounter = 1;
    id : number;
    email : string;
    password : string;

    constructor(id:number, email:string, password:string) {
        this.id = id;
        this.email = email;
        this.password = password;
    }
}