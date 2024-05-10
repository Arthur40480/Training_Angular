import { UserRole } from "./userRole.model";

export class User {
    static idCounter = 1;
    id : number;
    username : string;
    password : string;
    userRoles : UserRole[]; 

    constructor(username:string, password:string) {
        this.id = User.idCounter++;
        this.username = username;
        this.password = password;
        this.userRoles = [];
    }
}