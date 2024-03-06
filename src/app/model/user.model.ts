export class User {
    static idCounter = 1;
    id : number;
    email : string;
    password : string;
    roles : string[];

    constructor(email:string, password:string) {
        this.id = User.idCounter++;
        this.email = email;
        this.password = password;
        this.roles = ["USER"];
    }
}